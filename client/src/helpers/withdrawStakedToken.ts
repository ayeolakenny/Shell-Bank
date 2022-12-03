import { Contract, Signer } from "ethers";

export const withdrawStakedTokens = async (
  bankContract: Contract | undefined,
  signer: Signer,
  stakePositionId: number
) => {
  try {
    await bankContract?.connect(signer).withdrawStakedToken(stakePositionId);
    alert("Balance has been credited successfully");
  } catch (err: any) {
    console.log(err);
  }
};
