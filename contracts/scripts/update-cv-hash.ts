import hre from "hardhat";
import "@nomicfoundation/hardhat-ethers";
import * as fs from "fs";
import * as path from "path";

const PINATA_JWT = process.env.PINATA_JWT || "";
const STORE_CONTRACT_ADDRESS = process.env.STORE_CONTRACT_ADDRESS || "";

if (!PINATA_JWT) {
  throw new Error("PINATA_JWT is required in .env file");
}

if (!STORE_CONTRACT_ADDRESS) {
  throw new Error("STORE_CONTRACT_ADDRESS is required in .env file");
}

async function uploadJsonToIPFS(data: unknown): Promise<string> {
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
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Pinata JSON upload failed: ${response.statusText} - ${errorText}`,
    );
  }

  const result = await response.json();
  return result.IpfsHash as string;
}

async function uploadFileToIPFS(filePath: string): Promise<string> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at ${filePath}`);
  }

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
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Pinata file upload failed: ${response.statusText} - ${errorText}`,
    );
  }

  const result = await response.json();
  return result.IpfsHash as string;
}

async function main() {
  const { ethers } = hre;

  const cvDataPath = path.join(__dirname, "../data/cv-data.json");
  const picturePath = path.join(__dirname, "../data/picture.jpg");
  const cvPdfPath = path.join(__dirname, "../data/cv.pdf");

  if (!fs.existsSync(cvDataPath)) {
    throw new Error(`CV data file not found at ${cvDataPath}`);
  }

  const cvData = JSON.parse(fs.readFileSync(cvDataPath, "utf-8")) as {
    cv?: { linkCV?: string; photoUrl?: string };
  };

  const pictureHash = await uploadFileToIPFS(picturePath);
  const cvPdfHash = await uploadFileToIPFS(cvPdfPath);
  cvData.cv = cvData.cv || {};
  cvData.cv.photoUrl = pictureHash;
  cvData.cv.linkCV = `https://gateway.pinata.cloud/ipfs/${cvPdfHash}`;

  const cvDataHash = await uploadJsonToIPFS(cvData);

  const store = await ethers.getContractAt("Store", STORE_CONTRACT_ADDRESS);
  const tx = await store.setCVHash(cvDataHash);
  await tx.wait();

  console.log("Contract updated successfully");
  console.log(`Contract Address: ${STORE_CONTRACT_ADDRESS}`);
  console.log(`Picture Hash: ${pictureHash}`);
  console.log(`CV PDF Hash: ${cvPdfHash}`);
  console.log(`CV Data Hash: ${cvDataHash}`);
  console.log(`Picture URL: https://gateway.pinata.cloud/ipfs/${pictureHash}`);
  console.log(`CV PDF URL: https://gateway.pinata.cloud/ipfs/${cvPdfHash}`);
  console.log(`CV Data URL: https://gateway.pinata.cloud/ipfs/${cvDataHash}`);
  console.log(`Transaction: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
