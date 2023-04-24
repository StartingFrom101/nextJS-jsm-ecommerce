
import sanityCleint from "@sanity/client";
import imageUrlBuilder  from "@sanity/image-url";

export const client = sanityCleint({
    projectId: 'q3l8a8al', 
    dataset: 'production',
    apiVersion: '2023-04-20',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source); 