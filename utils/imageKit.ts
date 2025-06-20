import ImageKit from "imagekit";

type Configs = {
  publicKey: string;
  privateKey: string;
  baseUrl: string;
  id: string;
};

export const imageKit = ({ baseUrl, id, privateKey, publicKey }: Configs) =>
  new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint: `${baseUrl}/${id}/`,
  });
