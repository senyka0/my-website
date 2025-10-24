import hre from "hardhat";
import "@nomicfoundation/hardhat-ethers";
import * as fs from "fs";
import * as path from "path";

const PINATA_JWT = process.env.PINATA_JWT || "";

if (!PINATA_JWT) {
  throw new Error("PINATA_JWT is required in .env file. Get it from https://app.pinata.cloud/");
}

async function uploadToIPFS(data: any): Promise<string> {
  console.log("Uploading JSON data to Pinata...");
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify({
        pinataContent: data,
        pinataMetadata: {
          name: "CV Data",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pinata upload failed: ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();
  return result.IpfsHash;
}

async function uploadFileToIPFS(
  filePath: string,
  fileName: string
): Promise<string> {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found at ${filePath}, skipping...`);
    return "";
  }

  console.log(`Uploading ${fileName} to Pinata...`);
  const fileBuffer = fs.readFileSync(filePath);
  const formData = new FormData();
  const blob = new Blob([fileBuffer]);
  formData.append("file", blob, path.basename(filePath));

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pinata file upload failed: ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();
  return result.IpfsHash;
}

async function main() {
  const { ethers } = hre;

  const cvDataPath = path.join(__dirname, "../data/cv-data.json");
  const picturePath = path.join(__dirname, "../data/picture.jpg");
  const cvPdfPath = path.join(__dirname, "../data/cv.pdf");

  console.log("Step 1: Uploading picture to IPFS...");
  let pictureHash = "";
  try {
    pictureHash = await uploadFileToIPFS(picturePath, "picture.jpg");
    if (pictureHash) {
      console.log(`Picture uploaded to IPFS: ${pictureHash}`);
      console.log(`View at: https://gateway.pinata.cloud/ipfs/${pictureHash}`);
    }
  } catch (error) {
    console.error("Failed to upload picture:", error);
  }

  console.log("\nStep 2: Uploading CV PDF to IPFS...");
  let cvPdfHash = "";
  try {
    cvPdfHash = await uploadFileToIPFS(cvPdfPath, "cv.pdf");
    if (cvPdfHash) {
      console.log(`CV PDF uploaded to IPFS: ${cvPdfHash}`);
      console.log(`View at: https://gateway.pinata.cloud/ipfs/${cvPdfHash}`);
    }
  } catch (error) {
    console.error("Failed to upload CV PDF:", error);
  }

  console.log("\nStep 3: Preparing CV data...");
  let cvData: any;
  if (fs.existsSync(cvDataPath)) {
    cvData = JSON.parse(fs.readFileSync(cvDataPath, "utf-8"));
    if (pictureHash) {
      cvData.cv.photoUrl = pictureHash;
    }
    if (cvPdfHash) {
      cvData.cv.linkCV = `https://gateway.pinata.cloud/ipfs/${cvPdfHash}`;
    }
  } else {
    throw new Error(`CV data file not found at ${cvDataPath}`);
  }

  console.log("\nStep 4: Uploading CV data to IPFS...");
  const cvHash = await uploadToIPFS(cvData);
  console.log(`CV data uploaded to IPFS: ${cvHash}`);
  console.log(`View at: https://gateway.pinata.cloud/ipfs/${cvHash}`);

  console.log("\nStep 5: Deploying Store contract...");
  const Store = await ethers.getContractFactory("Store");
  const store = await Store.deploy();
  await store.waitForDeployment();
  const address = await store.getAddress();
  console.log(`Contract deployed to: ${address}`);

  console.log("\nStep 6: Waiting for deployment confirmations...");
  await store.deploymentTransaction()?.wait(3);
  console.log("Deployment confirmed!");

  console.log("\nStep 7: Setting CV hash in contract...");
  const tx = await store.setCVHash(cvHash);
  console.log(`Transaction sent: ${tx.hash}`);
  await tx.wait();
  console.log(`CV hash set in contract: ${cvHash}`);

  console.log("\nStep 8: Waiting for additional confirmations...");
  await tx.wait(2);

  console.log("\nStep 9: Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("Contract verified successfully");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract is already verified");
    } else {
      console.error("Verification failed:", error);
    }
  }

  console.log("\n=================================");
  console.log("Deployment Summary:");
  console.log("=================================");
  console.log(`Contract Address: ${address}`);
  console.log(`Picture IPFS Hash: ${pictureHash || "N/A"}`);
  console.log(`CV PDF IPFS Hash: ${cvPdfHash || "N/A"}`);
  console.log(`CV Data IPFS Hash: ${cvHash}`);
  console.log(
    `\nView Picture: https://gateway.pinata.cloud/ipfs/${pictureHash}`
  );
  console.log(`View CV PDF: https://gateway.pinata.cloud/ipfs/${cvPdfHash}`);
  console.log(`View CV Data: https://gateway.pinata.cloud/ipfs/${cvHash}`);
  console.log(`Contract: https://sepolia.basescan.org/address/${address}`);
  console.log("=================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
