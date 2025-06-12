export  default async function fetchOverview() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about_overview`, {
        // cache: "force-cache",
        cache: "no-store",
        next: { tags: ["page/about-us/aboutoverview"] },
    }); // Ensure API URL matches your setup
    console.log("response --> \n", res);
    const overview_arr = await res.json();
    const overview = overview_arr[0];
    return overview;
}


export   async function fetchMission() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about_mission`, {
        // cache: "force-cache",
        cache: "no-store",
        next: { tags: ["pages/about-us/about-medgel#MissionValues"] },
    }); 
    console.log("response --> \n", res);
    const mission_arr = await res.json();
    const mission = mission_arr[0];
    return mission;
}
    
