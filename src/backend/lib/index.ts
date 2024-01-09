import {
  dbFireStore,
  storage,
  formCollectionRef,
  formDataCollectionRef,
} from "../db";

import {
  addDoc as addDocFB,
  query,
  getDocs,
  QueryConstraint,
  updateDoc as updateDocFB,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

const collections = {
  forms: formCollectionRef,
  "form-data": formDataCollectionRef,
};

type Props = {
  collection: keyof typeof collections;
  values: {};
};

export const addDoc = async (
  collection: Props["collection"] = "forms",
  values: Props["values"]
) => {
  const getCollection = collections[collection];

  return await addDocFB(getCollection, values);
};

export const delFile = async (filePath: string) => {
  const storageRef = ref(storage, filePath);

  try {
    await deleteObject(storageRef);
    console.log("File deleted");
  } catch (error) {
    console.log({ error });
  }
};

export const delDoc = async (
  collection: Props["collection"] = "forms",
  id: string,
  filePath?: string
) => {
  if (filePath) delFile(filePath);
  return await deleteDoc(doc(dbFireStore, collection, id));
};

export const updateDoc = async (
  collection: Props["collection"] = "forms",
  id: string,
  values: Props["values"]
) => {
  return await updateDocFB(doc(dbFireStore, collection, id), values);
};

type FilterDocsProps = {
  collection: Props["collection"];
  where: QueryConstraint;
};

export const filterDoc = async (
  collection: FilterDocsProps["collection"] = "forms",
  id: string
) => {
  if (!id) return {};

  const getCollection = collections[collection];

  const docRef = doc(getCollection, id);
  const querySnapshot = await getDoc(docRef);

  return { id: querySnapshot.id, ...querySnapshot.data() };
};

export const filterDocs = async (
  collection: FilterDocsProps["collection"] = "forms",
  ...queryConstraints: QueryConstraint[]
) => {
  const getCollection = collections[collection];

  const res = query(getCollection, ...queryConstraints);
  const querySnapshot = await getDocs(res);

  const data = [] as any;

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

type FileUploadProps = {
  fileName: string;
  file: File | any;
};

export const fileUpload = async (
  fileName: FileUploadProps["fileName"],
  file: FileUploadProps["file"]
) => {
  const storageRef = ref(storage, fileName);

  return await uploadBytes(storageRef, file);
};

export const getFile = async (filePath: string) => {
  const fileref = ref(storage, filePath);
  return await getDownloadURL(fileref).then((url) => url);
};

export const getFilesInFolder = async (filePath: string, blob = false) => {
  const folderRef = ref(storage, filePath);

  const folder = await listAll(folderRef);

  let files;

  files = folder.items.map((itemRef) => getDownloadURL(itemRef));

  return Promise.all(files);
};
