export const dialogMessages = {
    INSTALL_METAMASK: {
        title: 'Wanna play?',
        message: <p><a className="font-bold" href="https://metamask.io/" target="_blank">Click here</a> to download and install MetaMask</p>
    },
    CONNECT_ACCOUNT: {
        title: 'Anonymous friend!',
        message: <p>Connect or create a wallet in MetaMask</p>
    },
    SELECT_NETWORK: {
        title: 'Wrong network!',
        message: <p>Select the Goerli Testnet in MetaMask</p>
    },
    INSUFFICIENT_FUNDS: {
        title: 'No funds!',
        message:
        <>
            <p>There is not enough ETH to pay the ticket price in this wallet.</p>
            <a className="font-bold" href="https://goerlifaucet.com/" target="_blank">Click here</a> to get some free GoerliETH
        </>
    },
    ALL_STEPS: {
        title: 'Hi there! Wanna play?',
        message:
            <ol className="list-inside list-decimal">
                <li><a className="font-bold" href="https://metamask.io/" target="_blank">Click here</a> to download and install MetaMask</li>
                <li>Connect or create a wallet in MetaMask</li>
                <li>Select the Goerli Testnet in MetaMask</li>
                <li><a className="font-bold" href="https://goerlifaucet.com/" target="_blank">Click here</a> to get some free GoerliETH</li>
            </ol>
    }
}
