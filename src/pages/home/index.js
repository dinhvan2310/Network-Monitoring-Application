import { useEffect } from "react";
import hostService from "services/hostService";

function Home() {

    useEffect(() => {
        const fetchHosts = async () => {
            const response = await hostService.getHosts();
            console.log(response);
            const items = await hostService.getItemsByHost(response.result[1].hostid);
            console.log(items);
        };
        fetchHosts();
    })

    return <div style={{
        height: 3600,
    }}>
        <h2>Home page</h2>
    </div>;
}

export default Home;
