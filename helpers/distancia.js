const distancia = (a, b) => {
  //Radio de la tierra
  const R = 6371e3;
  const fi1 = (a.latitud * Math.PI) / 180; // fi, lamda en radianes
  const fi2 = (b.latitud * Math.PI) / 180; // fi, lamda en radianes
  const deltaFi = ((b.latitud - a.latitud) * Math.PI) / 180;
  const deltaLamda = ((b.longitud - a.longitud) * Math.PI) / 180;
  const d =
    Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
    Math.cos(fi1) *
      Math.cos(fi2) *
      Math.sin(deltaLamda / 2) *
      Math.sin(deltaLamda / 2);
  const c = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
  return R * c;
};

module.exports = distancia;
