import fetchPage from "@/helpers/getPage";

const page_title = `about-us/life-at-medgel`;

const Sample = async () => {
    const content = await fetchPage(page_title);
    console.log("fetched career", content);

    return (
        <>
            <div>{content.title}</div>
            <div>{content.content.main_title}</div>
        </>
    );
};

export default Sample;
