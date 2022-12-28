import {etherscanHttpClient} from "./http";

const getBlockCountdownURL = '?module=block&action=getblockcountdown&blockno='

class EtherscanService {
    getBlockCountdown(blockNumber: string) {
        return etherscanHttpClient.get(getBlockCountdownURL + blockNumber);
    }
}

export default new EtherscanService();
