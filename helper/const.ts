import { getFileData, writeFileData } from "./config";
require("dotenv").config();
export const decimals = 9;
export const totalSupply = 1000;
export const name = "BANG";
export const symbol = "$BG";
export const image = "https://icons8.com/icon/OFHwDWASQWmX/coin";
export const royalty = 1000; // 100 = 1%
export const isMutable = true;
export const newUpdateAuthority = undefined;
export const mintAuthority = null;
export const freezeAuthority = null;
export const verifySignerAsCreator = true;

export const networkName = !!process.env.NETWORK
  ? process.env.NETWORK
  : "devnet";
const mintAddressConfig = {
  path: `../outputs/${name.replace(" ", "_")}.txt`,
  key: "MINT_ADDRESS",
};
export const getMintAddress = async () => {
  return !!process.env.TOKEN_ADDRESS
    ? process.env.TOKEN_ADDRESS
    : getFileData(mintAddressConfig.path, mintAddressConfig.key);
};
export const setMintAddress = async (data: string) => {
  return writeFileData(mintAddressConfig.path, mintAddressConfig.key, data);
};

const mintKeypairConfig = {
  path: `../outputs/${name.replace(" ", "_")}.txt`,
  key: "MINT_KEYPAIR",
};
export const setMintKeypair = async (data: string) => {
  return writeFileData(mintKeypairConfig.path, mintKeypairConfig.key, data);
};
