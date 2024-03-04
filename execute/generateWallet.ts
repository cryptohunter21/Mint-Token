// Importing required modules
import fs from "fs";
import readline from "readline";
import { Keypair } from "@solana/web3.js";

// Creating a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompting the user for the number of wallets to generate
function askQuestion() {
  let wallets: [];
  rl.question(
    "How many wallets do you want to generate (max: 100)? ",
    (numberWallets: string) => {
      // Parsing the user input as an integer
      const numWallets: number = parseInt(numberWallets);
      if (numWallets > 100) {
        console.log(`Please enter a valid number!`);
        askQuestion();
        return;
      } else {
        console.log(`User entered: ${numWallets}`);
        // Generating the specified number of wallets
        for (let i = 0; i < numWallets; i++) {
          console.log(`Generating wallet ${i + 1} of ${numWallets}`);

          // Generating a new random Solana keypair
          const keypair = Keypair.generate();

          // Getting the private key as a byte array
          const privateKey = keypair.secretKey;

          // Getting the public key as a base58 encoded string (i.e. the wallet address)
          const publicKey = keypair.publicKey.toString();

          interface Wallet {
            private_key: string;
            public_address: string;
          }

          const wallets: Wallet[] = [];
          // Adding the generated wallet to the array
          wallets.push({
            private_key: privateKey.toString(),
            // private_key: privateKey,
            public_address: publicKey,
          });
        }

        console.log(`Generated ${numWallets} wallets`);

        try {
          // Saving the generated wallets to a file using fs.writeFileSync
          const data: string = JSON.stringify(wallets, null, 4);
          fs.writeFileSync("../outputs/wallet.txt", data);
          console.log(`Saved generated wallets to wallet.txt`);
        } catch (err: any) {
          console.error(
            `An error occurred while writing to the file: ${err.message}`
          );
        }
      }
      // Closing the readline interface
      rl.close();
    }
  );
}

askQuestion();
