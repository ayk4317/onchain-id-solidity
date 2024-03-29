import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import 'solidity-coverage';
import "@nomiclabs/hardhat-solhint";

import "./tasks/add-claim.task";
import "./tasks/add-key.task";
import "./tasks/deploy-identity.task";
import "./tasks/deploy-proxy.task";
import "./tasks/remove-claim.task";
import "./tasks/remove-key.task";
import "./tasks/revoke.task";

import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const BSCTESTNET:string = process.env.BSCTESTNETURL ?? "";
const BSCAPIKEY:string = process.env.BSCAPI ?? "";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/v1/9cd3d6ce21f0a25bb8f33504a1820d616f700d24',
      accounts: ["1d79b7c95d2456a55f55a0e17f856412637fa6b3c332fa557ce2c8a89139ec74"],
    },
    bscTest: {
      url: BSCTESTNET
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCAPIKEY
    }
  }
};

export default config;
