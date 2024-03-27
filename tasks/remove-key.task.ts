import {task} from "hardhat/config";
import {TaskArguments} from "hardhat/types";
import { AbiCoder } from 'ethers';

task("remove-key", "Remove a purpose from a key on an identity")
  .addParam("from", "A MANAGEMENT key on the claim issuer")
  .addParam("identity", "The address of the identity")
  .addParam("key", "The key (ethereum address)")
  .addParam("type", "The type of the key (ECDSA = 1)")
  .addParam("purpose", "The purpose to remove (MANAGEMENT = 1, ACTION = 2, CLAIM = 3)")
  .setAction(async (args: TaskArguments, hre) => {
    const signer = await hre.ethers.getSigner(args.from);

    const identity = await hre.ethers.getContractAt('Identity', args.identity, signer);

    const keyHash = hre.ethers.keccak256(
      AbiCoder.defaultAbiCoder().encode(['address'], [args.key]),
    );

    const tx = await identity.removeKey(
      keyHash,
      args.purpose,
    );

    console.log(`Remove purpose ${args.purpose} from key ${args.key} (hash: ${keyHash}) on identity ${args.identity} tx: ${tx.hash}`);

    await tx.wait();

    console.log(`Remove purpose ${args.purpose} from key ${args.key} (hash: ${keyHash}) on identity ${args.identity} tx mined: ${tx.hash}`);
  });
