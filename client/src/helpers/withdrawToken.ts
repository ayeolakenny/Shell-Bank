import { BigNumber, Contract, Signer } from "ethers";

export const withdrawTokens = async (
  wei: BigNumber,
  symbol: string,
  bankContract: Contract | undefined,
  signer: Signer
) => {
  try {
    if (symbol === "Matic") {
      await bankContract?.connect(signer).withdrawMatic(wei);
    } else {
      await bankContract?.connect(signer).withdrawTokens(wei, symbol);
    }
  } catch (err: any) {
    if (err.error.data.message === "execution reverted: Insufficient funds") {
      alert("Insufficient funds");
    }
  }
};
