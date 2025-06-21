import ImageKit from "imagekit";
import type { FileObject, FolderObject } from "imagekit/dist/libs/interfaces";

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

export const isFileObject = (
  file: FileObject | FolderObject
): file is FileObject => "fileId" in file;
