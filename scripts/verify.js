const hre = require("hardhat");
require('dotenv').config();

async function main() {
    const ZEROADDR = hre.ethers.constants.AddressZero;
    const DEADADDR = "0x000000000000000000000000000000000000d3ad"
    
    await hre.run("verify:verify", {
        address: process.env.BSCTEST_IDENTITYIMPLEMENTATION,
        constructorArguments: [DEADADDR, true],
        contract: "contracts/Identity.sol:Identity"
    });

    await hre.run("verify:verify", {
        address: process.env.BSCTEST_IMPLEMENTATIONAUTHORITY,
        constructorArguments: [process.env.BSCTEST_IDENTITYIMPLEMENTATION],
        contract: "contracts/proxy/ImplementationAuthority.sol:ImplementationAuthority"
    });

    await hre.run("verify:verify", {
        address: process.env.BSCTEST_IDFACTORY,
        constructorArguments: [process.env.BSCTEST_IMPLEMENTATIONAUTHORITY],
        contract: "contracts/factory/IdFactory.sol:IdFactory"
    });

};

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});