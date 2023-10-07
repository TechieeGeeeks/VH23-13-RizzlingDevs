const contract_BatchCertificates_Address="0x3D68b4192502Ed9e0E236f5b990ac1c356AABbbe";
const contract_BatchCertificates_ABI=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "mongo_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hashes",
				"type": "string"
			}
		],
		"name": "addHashes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "source",
				"type": "string"
			}
		],
		"name": "encodeStringBytes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "mongo_key",
				"type": "string"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "hashArrayMapping",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
module.exports={contract_BatchCertificates_ABI,contract_BatchCertificates_Address};