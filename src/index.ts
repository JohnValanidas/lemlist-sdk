import { LemListAPI } from "./lemlist";

const api = new LemListAPI("");

async function main() {
    const campaigns = await api.getCampaigns();
    // const campaigns = await api.getCampaign("cam_YzhnS99DNQh5GnQTL");
    console.log(campaigns);
}

main();