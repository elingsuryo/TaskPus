export const getDataTambahSurat = async () => {
  const [kepala, rangka, tempat] = await Promise.all([
    fetch("http://localhost:8000/api/kepala-puskesmas").then((r) => r.json()),
    fetch("http://localhost:8000/api/dalam-rangka").then((r) => r.json()),
    fetch("http://localhost:8000/api/tempat").then((r) => r.json()),
  ]);

  return {
    kepalaPuskesmas: kepala,
    dalamRangka: rangka,
    tempat: tempat,
  };
};
