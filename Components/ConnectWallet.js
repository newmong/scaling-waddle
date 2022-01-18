import { AccountBalanceWallet } from "@material-ui/icons";

function ConnectWallet({ connectWallet }) {
return (
    <button
      type="button"
      className="navIcon"
      onClick={() => {
        connectWallet();
      }}
    >
      <AccountBalanceWallet fontSize="large" style={{ paddingRight: "10px" }} />
    </button>
  );
}

export default ConnectWallet;
