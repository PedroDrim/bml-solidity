#!/bin/bash
solc -o contract-deploy --evm-version paris --optimize --bin --abi --overwrite contract/block/simulationblock/SimulationBlock.sol

solc -o contract-deploy --evm-version paris --optimize --bin --abi --overwrite contract/model/debug/Beb.sol