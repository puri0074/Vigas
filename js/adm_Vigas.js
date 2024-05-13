import { formas, aceros } from "./select.js";
import { tabla_vigas, tabla_aceros } from "./tables.js";

function fillSelects(selects, values) {
  selects.forEach((select) => {
    const selected = select.getAttribute("data-selected") ?? "";
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = option.text = value;
      if (selected === value) {
        option.selected = true;
      }
      select.add(option);
    });
  });
}

function buscar(tabla, value, columna) {
  return tabla[value][columna - 2];
}

fillSelects(document.querySelectorAll("select.Vigas"), formas);
fillSelects(document.querySelectorAll("select.Aceros"), aceros);

$(document).ready(function () {
  document.getElementById("tviga").addEventListener("change", calcular);
  document.getElementById("ultdiseño").addEventListener("input", calcular);
  document.getElementById("cortultimo").addEventListener("input", calcular);
  document.getElementById("defcalculada").addEventListener("input", calcular);
  document.getElementById("Lviga").addEventListener("input", calcular);
  document.getElementById("Ltrabajo").addEventListener("input", calcular);
  document.getElementById("Tacero").addEventListener("input", calcular);
  document.getElementById("Modelasticidad").addEventListener("input", calcular);
  document.getElementById("Tregidizadores").addEventListener("input", calcular);
  document. getElementById("SeparacionRegi").addEventListener("input", calcular);
  document.getElementById("Factormod").addEventListener("input", calcular);
  document.getElementById("donde1").addEventListener("input", calcular);
  document.getElementById("donde2").addEventListener("input", calcular);

  calcular();
  function calcular() {
    // I. Datos de Entrada
    var tviga = document.getElementById("tviga").value;
    var ultdiseño = parseFloat(document.getElementById("ultdiseño").value);
    var cortultimo = parseFloat(document.getElementById("cortultimo").value);
    var defcalculada = parseFloat(document.getElementById("defcalculada").value);
    var Lviga = parseFloat(document.getElementById("Lviga").value);
    var Ltrabajo = parseFloat(document.getElementById("Ltrabajo").value);
    var Tacero = document.getElementById("Tacero").value;
    var Modelasticidad = parseFloat(document.getElementById("Modelasticidad").value);
    var Tregidizadores = document.getElementById("Tregidizadores").value;
    var SeparacionRegi = document.getElementById("SeparacionRegi").value;
    var Factormod = parseFloat(document.getElementById("Factormod").value);
    var donde1 = parseFloat(document.getElementById("donde1").value);
    var donde2 = parseFloat(document.getElementById("donde2").value);

    const entradas = `
    <tr>
        <td>Tipo de Viga</td>
        <td>-</td>
        <td>-</td>
        <td>${tviga}</td>
        <td>-</td>
    </tr>
    <tr>
        <td>Momento Último de diseño</td>
        <td>Mu</td>
        <td>-</td>
        <td>${ultdiseño}</td>
        <td>Ton-m</td>
    </tr>
    <tr>
        <td>Cortante último de diseño</td>
        <td>Vu</td>
        <td>-</td>
        <td>${cortultimo}</td>
        <td>Ton</td>
    </tr>
    <tr>
        <td>Deflexion calculada</td>
        <td>ΔElas</td>
        <td>-</td>
        <td>${defcalculada}</td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Longitud de la Viga</td>
        <td>L</td>
        <td>-</td>
        <td>${Lviga}</td>
        <td>m</td>
    </tr>
    <tr>
        <td>Longitud de trabajo libre de arriostramiento</td>
        <td>Lb</td>
        <td>-</td>
        <td>${Ltrabajo}</td>
        <td>m</td>
    </tr>
    <tr>
        <td>Tipo de Acero</td>
        <td></td>
        <td>-</td>
        <td>${Tacero}</td>
        <td>-</td>
    </tr>
    <tr>
        <td>Módulo de elasticidad del Acero</td>
        <td>Es</td>
        <td>-</td>
        <td>${Modelasticidad}</td>
        <td>kg/cm2</td>
    </tr>
    <tr>
        <td>Tiene regidizadores ?</td>
        <td>Tr</td>
        <td>-</td>
        <td>${Tregidizadores}</td>
        <td>-</td>
    </tr>
    <tr>
        <td>Separación entre regidizadores</td>
        <td>a =</td>
        <td>-</td>
        <td>${SeparacionRegi}</td>
        <td>-</td>
    </tr>
    
    <tr>
        <td>Factor de modificación de pandeo lateral</td>
        <td>Cb =</td>
        <td>-</td>
        <td>${Factormod}</td>
        <td>m</td>
    </tr>
    <tr>
        <td>Donde:</td>
        <td>øb</td>
        <td>-</td>
        <td>${donde1}</td>
        <td>-</td>
    </tr>
    <tr>
        <td>Donde:</td>
        <td>øc =</td>
        <td>-</td>
        <td>${donde2}</td>
        <td>-</td>
    </tr>`;

    var tabla = document.getElementById("entradas");
    tabla.innerHTML = entradas;

    var salidas = "";
    //Esfuerzo de fluencia de acero
    var EsfuerzoAcero = buscar(tabla_aceros, Tacero, 6);

    //Peralte de viga
    var PeralteViga = buscar(tabla_vigas, tviga, 5);

    //Longitud libre del alma
    var LongitudLibre = buscar(tabla_vigas, tviga, 19);

    //Ancho del Patín
    var AnchoPatin = buscar(tabla_vigas, tviga, 9);

    //Espersor del Patín
    var EspersorPatin = buscar(tabla_vigas, tviga, 11);

    //Espesor del Alma
    var EspersorAlma = buscar(tabla_vigas, tviga, 7);

    //Inercia en X
    var InerciaX = buscar(tabla_vigas, tviga, 27);

    //Inercia en Y
    var InerciaY = buscar(tabla_vigas, tviga, 35);

    //Módulo de alabeo
    var ModuloAlabeo = buscar(tabla_vigas, tviga, 49);

    //Módulo de torsión
    var ModuloTorsion = buscar(tabla_vigas, tviga, 47);

    //Módulo de Plástico
    var ModuloPlastico = buscar(tabla_vigas, tviga, 33);

    //Módulo elástico
    var ModElastico = buscar(tabla_vigas, tviga, 29);

    //Radio de giro efectivo
    var GiroEfectivo = buscar(tabla_vigas, tviga, 43);

    //Radio de giro en Y
    var GiroY = buscar(tabla_vigas, tviga, 39);

    //Dist. Entre centros de patin
    var CentroPatin = PeralteViga - EspersorPatin;

    salidas += `
    <tr>
    <th colspan="5" scope="col">I. Datos de salida</th>
    </tr>
    <!--01-->
    <tr>
        <td>Esfuerzo de fluencia de acero</td>
        <td>Fy =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="EsfuerzoAcero">${EsfuerzoAcero.toFixed(2)}</span></td>
        <td>kg/cm2</td>
    </tr>
    <tr>
        <th colspan="5" scope="col">II. Propiedades Geométricas de la Viga</th>
    </tr>
    <!---02--->
    <tr>
        <td>Peralte de la Viga</td>
        <td>d =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="PeralteViga">${PeralteViga.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Longitud Libre del Alma</td>
        <td>T =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="LongitudLibre">${LongitudLibre.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Ancho del Patín</td>
        <td>bf =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="AnchoPatin">${AnchoPatin.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Espersor del Patín</td>
        <td>tf =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="EspersorPatin">${EspersorPatin.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Espesor del Alma</td>
        <td>tw =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="EspersorAlma">${EspersorAlma.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Inercia en X</td>
        <td>Ixx =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="InerciaX">${InerciaX.toFixed(2)}</span></td>
        <td>cm4</td>
    </tr>
    <tr>
        <td>Inercia en Y</td>
        <td>Iyy =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="InerciaY">${InerciaY.toFixed(2)}</span></td>
        <td>cm4</td>
    </tr>
    <tr>
        <td>Módulo de alabeo</td>
        <td>Cw =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="ModuloAlabeo">${ModuloAlabeo.toFixed(2)}</span></td>
        <td>cm6</td>
    </tr>
    <tr>
        <td>Módulo de torsión</td>
        <td>J =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="ModuloTorsion">${ModuloTorsion.toFixed(2)}</span></td>
        <td>cm4</td>
    </tr>
    <tr>
        <td>Módulo de Plástico</td>
        <td>Zx =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="ModuloPlastico">${ModuloPlastico.toFixed(2)}</span></td>
        <td>cm3</td>
    </tr>
    <tr>
        <td>Módulo elástico</td>
        <td>Sx =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="ModElastico">${ModElastico.toFixed(2)}</span></td>
        <td>cm3</td>
    </tr>
    <tr>
        <td>Radio de giro efectivo</td>
        <td>rT =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="GiroEfectivo">${GiroEfectivo.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Radio de giro en Y</td>
        <td>ry =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="GiroY">${GiroY.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Dist. Entre centros de patin</td>
        <td>ho =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="CentroPatin">${CentroPatin.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>`;

    //III. Esbeltez local
    //3.1. Revisión del pandeo local en los patines

    //Limite Inferior de esbeltez en el patín
    var LimiteInferior = 0.38 * Math.sqrt(Modelasticidad / EsfuerzoAcero);

    //Limite Superior de esbeltez en el patín
    var LimiteSuperior = 1 * Math.sqrt(Modelasticidad / EsfuerzoAcero);

    //Límite de esbeltez en el Patin
    var LimiteEsbeltez = AnchoPatin / (2 * EspersorPatin);

    //Limite Inferior de esbeltez en el Alma
    var limiteInferiorAlma = 3.76 * Math.sqrt(Modelasticidad / EsfuerzoAcero);

    //Limite Superior de esbeltez en el Alma
    var LimiteSuperiorAlma = 5.7 * Math.sqrt(Modelasticidad / EsfuerzoAcero);

    //Límite de esbeltez en el Alma
    var LimiteEsbeltezAlma = LongitudLibre / EspersorAlma;

    salidas += `
    <tr>
    <th colspan="5" scope="col" style="text-align: center">III. Esbeltez local</th>
    </tr>
    <tr>
        <th colspan="5" scope="col">3.1. Revisión del pandeo local en los patines</th>
    </tr>
    <tr>
      <td>Limite Inferior de esbeltez en el patín</td>
      <td>𝜆p =</td>
      <td>-</td>
      <td><span class="xlsx-cell" id="LimiteInferior">${LimiteInferior.toFixed(2)}</span></td>
      <td>-</td>
    </tr>
    <tr>
        <td>Limite Superior de esbeltez en el patín</td>
        <td>𝜆r =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="LimiteSuperior">${LimiteSuperior.toFixed(2)}</span></td>
        <td>-</td>
    </tr>
    <tr>
        <td>Límite de esbeltez en el Patin</td>
        <td>𝜆 =</td>
        <td>bf /(2tf)</td>
        <td><span class="xlsx-cell" id="LimiteEsbeltez">${LimiteEsbeltez.toFixed(2)}</span></td>
        <td>Compacto</td>
    </tr>
    <th colspan="5" scope="col">3.2. Revisión del pandeo local en el alma</th>
    <!--La otra mitad--->
    <tr>
        <td>Limite Inferior de esbeltez en el Alma</td>
        <td>𝜆p =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="limiteInferiorAlma">${limiteInferiorAlma.toFixed(2)}</span></td>
        <td>-</td>
    </tr>
    <tr>
        <td>Limite Superior de esbeltez en el Alma</td>
        <td>𝜆r =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="LimiteSuperiorAlma">${LimiteSuperiorAlma.toFixed(2)}</span></td>
        <td>-</td>
    </tr>
    <tr>
        <td>Límite de esbeltez en el Alma</td>
        <td>𝜆 =</td>
        <td>T /(tw)</td>
        <td><span class="xlsx-cell" id="LimiteEsbeltezAlma">${LimiteEsbeltezAlma.toFixed(2)}</span></td>
        <td>Compacto</td>
    </tr>`;

    //IV. Resistencia a flexión

    // Lp =
    var Lp = parseFloat(1.76 * GiroY * Math.sqrt(Modelasticidad / EsfuerzoAcero));

    // Lr
    var Lr =
      1.95 *
      GiroEfectivo *
      (Modelasticidad / (0.7 * EsfuerzoAcero)) *
      Math.sqrt(ModuloTorsion / (ModElastico * CentroPatin)) *
      Math.sqrt(
        1 +
          Math.sqrt(
            1 + 6.76 * Math.pow((0.7 * EsfuerzoAcero * ModElastico * CentroPatin) / (Modelasticidad * ModuloTorsion), 2)
          )
      );

    //Lb =
    var Lb = parseFloat(Ltrabajo * 100);

    //Momento Resistencia a flexión, Ton-m
    if (Lb < Lp) {
      var ZonaMomentoResistencia = "Zona 1";
    }
    if (Lb >= Lp && Lb < Lr) {
      var ZonaMomentoResistencia = "Zona 2";
    } else {
      var ZonaMomentoResistencia = "Zona 3";
    }

    //Zona 1
    var Zona1 = EsfuerzoAcero * ModuloPlastico;

    // Zona 2
    const zona2Resultado =
      Factormod * (Zona1 - (Zona1 - 0.7 * EsfuerzoAcero * ModElastico) * ((Ltrabajo * 100 - Lp) / (Lr - Lp)));
    if (zona2Resultado > Zona1) {
      var Zona2 = Zona1;
    } else {
      var Zona2 = zona2Resultado;
    }

    // Zona 3
    const zona3Resultado =
      ((Factormod * Math.PI ** 2 * Modelasticidad) / ((Ltrabajo * 100) / GiroEfectivo) ** 2) *
      Math.sqrt(1 + 0.078 * (ModuloTorsion / (ModElastico * CentroPatin)) * ((Ltrabajo * 100) / GiroEfectivo) ** 2) *
      ModElastico;
    if (zona3Resultado > Zona1) {
      var Zona3 = Zona1;
    } else {
      var Zona3 = zona3Resultado;
    }

    // ZonaMomentoResistencia
    if (Lb < Lp) {
      var ZonaMomentoResistencia = "Zona 1";
    } else if (Lb >= Lp && Lb < Lr) {
      var ZonaMomentoResistencia = "Zona 2";
    } else {
      var ZonaMomentoResistencia = "Zona 3";
    }

    // MomentoResistencia
    if (ZonaMomentoResistencia === "Zona 1") {
      var MomentoResistencia = Zona1 * (((1 / 1000) * 1) / 100);
    } else if (ZonaMomentoResistencia === "Zona 2") {
      var MomentoResistencia = Zona2 * (((1 / 1000) * 1) / 100);
    } else {
      var MomentoResistencia = Zona3 * (((1 / 1000) * 1) / 100);
    }

    // TipoMomentoResistencia
    if (ZonaMomentoResistencia === "Zona 1") {
      var TipoMomentoResistencia = "Mp1";
    } else if (ZonaMomentoResistencia === "Zona 2") {
      var TipoMomentoResistencia = "Mn2";
    } else if (ZonaMomentoResistencia === "Zona 3") {
      var TipoMomentoResistencia = "Mn3";
    } else {
      var TipoMomentoResistencia = "Zona invalida";
    }

    // OMn
    var Omn = MomentoResistencia * donde1;

    // Mu
    var Mu = ultdiseño;

    // OmnMu
    if (Omn <= Mu) {
      var OmnMu = "<";
    } else {
      var OmnMu = ">";
    }

    // OmnMuCumple
    if (OmnMu === ">") {
      var OmnMuCumple = "¡Cumple!";
    } else {
      var OmnMuCumple = "¡No cumple!";
    }

    // OmnMuPorcentaje
    var OmnMuPorcentaje = ((Mu / Omn) * 100).toFixed(0) + "%";

    salidas += `
    <tr>
        <th colspan="5" scope="col">IV. Resistencia a flexión</th>
    </tr>
    <tr>
        <td>Zona 1</td>
        <td>Mp1 =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="Zona1">${Zona1.toFixed(2)}</span></td>
        <td>kg-cm</td>
    </tr>
    <tr>
        <td>Zona 2</td>
        <td>Mn2 =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="Zona2">${Zona2.toFixed(2)}</span></td>
        <td>kg-cm</td>
    </tr>
    <tr>
        <td>Zona 3</td>
        <td>Mn3 =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="Zona3">${Zona3.toFixed(2)}</span></td>
        <td>kg-cm</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Lp =</td>
      <td>-</td>
      <td><span class="xlsx-cell" id="Lp">${Lp.toFixed(2)}</span></td>
      <td>cm</td>
    </tr>
    <tr>
      <td>-</td>
      <td>Lr =</td>
      <td>-</td>
      <td><span class="xlsx-cell" id="Lr">${Lr.toFixed(2)}</span></td>
      <td>cm</td>
    </tr>
    <tr>
        <td>-</td>
        <td>Lb =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="D">${Lb.toFixed(2)}</span></td>
        <td>cm</td>
    </tr>
    <tr>
        <td>Momento Resistencia a flexión, Ton-m</td>
        <td id="TipoMomentoResistencia">${TipoMomentoResistencia}</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="MomentoResistencia">${MomentoResistencia.toFixed(2)}</span></td>
        <td id="ZonaMomentoResistencia">${ZonaMomentoResistencia}</td>
    </tr>
    <tr>
        <td colspan="5" style="text-align: center">øMn =
        <span class="xlsx-cell" id="Omn">${Omn.toFixed(2)}</span>
        Ton-m
        <span class="xlsx-cell" id="OmnMu">${OmnMu}</span>
        Mu =
        <span class="xlsx-cell" id="Mu">${Mu}</span>
        Ton-m
        <span class="xlsx-cell" id="OmnMuCumple">${OmnMuCumple}</span>
        <span class="xlsx-cell" id="OmnMuPorcentaje">${OmnMuPorcentaje}</span>
        </td>
    </tr>`;

    var I18 = 0;
    // V. Resistencia a cortante
    if ((I18 * 100) / LongitudLibre > (260 / (LongitudLibre / EspersorAlma)) ** 2 || (I18 * 100) / LongitudLibre > 3) {
      var No = 5;
    } else {
      var No = 5 + 5 / ((I18 * 100) / LongitudLibre) ** 2;
    }

    if (LongitudLibre / EspersorAlma < 260) {
      var Si = 5;
    } else {
      var Si = "Atiezadores";
    }

    // CoeficientePandeo
    if (Tregidizadores === "No") {
      var CoeficientePandeo = Si;
    } else {
      var CoeficientePandeo = No;
    }

    // Tw
    var Tw = LongitudLibre / EspersorAlma;

    // LInferior
    var LInferior = 1.1 * Math.sqrt((CoeficientePandeo * Modelasticidad) / EsfuerzoAcero);

    // LSuperior
    var LSuperior = 1.37 * Math.sqrt((CoeficientePandeo * Modelasticidad) / EsfuerzoAcero);

    // Coefcv
    if (LongitudLibre / EspersorAlma < LInferior) {
      var Coefcv = 1;
    } else if (LongitudLibre / EspersorAlma >= LInferior && LongitudLibre / EspersorAlma < LSuperior) {
      var Coefcv = LInferior / (LongitudLibre / EspersorAlma);
    } else {
      var Coefcv = (1.51 * Modelasticidad * CoeficientePandeo) / ((LongitudLibre / EspersorAlma) ** 2 * EsfuerzoAcero);
    }

    // ZonaCoefcv
    if (Tw < LInferior) {
      var ZonaCoefcv = "Zona 1";
    } else if (Tw >= LInferior && Tw < LSuperior) {
      var ZonaCoefcv = "Zona 2";
    } else {
      var ZonaCoefcv = "Zona 3";
    }

    // ACortante
    var ACortante = PeralteViga * EspersorAlma;

    // ResistCortante
    var ResistCortante = 0.6 * EsfuerzoAcero * ACortante * Coefcv;

    // OVn
    var OVn = (donde2 * ResistCortante) / 1000;

    // OVnVuMayorMenor
    if (OVn <= Vu) {
      var OVnVuMayorMenor = "<";
    } else {
      var OVnVuMayorMenor = ">";
    }

    // Vu
    var Vu = cortultimo;

    // OVnVuCumpleNOCumple
    if (OVnVuMayorMenor === ">") {
      var OVnVuCumpleNOCumple = "¡Cumple!";
    } else {
      var OVnVuCumpleNOCumple = "¡No cumple!";
    }

    // OvnVuPorcentaje
    var OvnVuPorcentaje = ((Vu / OVn) * 100).toFixed(0) + "%";

    salidas += `
    <tr>
        <th colspan="5" scope="col">V. Resistencia a cortante</th>
    </tr>
    <tr>
        <td>Coeficiente de pandeo de placa</td>
        <td>Kv</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="CoeficientePandeo">${CoeficientePandeo.toFixed(2)}</span></td>
        <td>-</td>
    </tr>
    <tr>
        <td>-</td>
        <td>h/tw =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="Tw">${Tw.toFixed(2)}</span></td>
        <td>-</td>
    </tr>
    <tr>
        <td>Limite Inferior</td>
        <td>√(𝐾𝑣 𝐸/𝐹𝑦)</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="LInferior">${LInferior.toFixed(2)}</span></td>
        <td>-</td>
    </tr>
    <tr>
        <td>Limite Superior</td>
        <td>√(𝐾𝑣 𝐸/𝐹𝑦)  </td>
        <td>-</td>
        <td><span class="xlsx-cell" id="LSuperior">${LSuperior.toFixed(2)}</span></td>
        <td>-</td>
    </tr>
    <tr>
        <td>Coeficiente Cv</td>
        <td>Cv =</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="Coefcv">${Coefcv.toFixed(2)}</span></td>
        <td id="ZonaCoefcv">${ZonaCoefcv}</td>
    </tr>
    <tr>
        <td>Área de Cortante</td>
        <td>Aw = d*tw</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="ACortante">${ACortante.toFixed(2)}</span></td>
        <td>cm2</td>
    </tr>
    <tr>
        <td>Resistencia a Cortante</td>
        <td>Vn = 0.6*Fy*Aw * C</td>
        <td>-</td>
        <td><span class="xlsx-cell" id="ResistCortante">${ResistCortante.toFixed(2)}</span></td>
        <td>Kg</td>
    </tr>
    <tr>
        <td colspan="5" style="text-align: center">øVn =
        <span class="xlsx-cell" id="OVn">${OVn.toFixed(2)}</span>
        Ton
        <span class="xlsx-cell" id="OVnVuMayorMenor">${OVnVuMayorMenor}</span>
        Vu =
        <span class="xlsx-cell" id="Vu">${Vu.toFixed(2)}</span>
        Ton
        <span class="xlsx-cell" id="OVnVuCumpleNOCumple">${OVnVuCumpleNOCumple}</span>
        <span class="xlsx-cell" id="OvnVuPorcentaje">${OvnVuPorcentaje}</span>
        </td>
    </tr>`;

    // VI. Analisis de deflexion

    // DefPermitida
    var DefPermitida = (Lviga * 100) / 360;

    // DLimite
    var DLimite = DefPermitida;

    // DElastico
    var DElastico = defcalculada;

    if (DLimite <= DElastico) {
      var DLimiteDElasticoMayorMenor = "<";
    } else {
      var DLimiteDElasticoMayorMenor = ">";
    }

    // DLimDElastCumpleNoCumple
    if (DLimiteDElasticoMayorMenor === ">") {
      var DLimDElastCumpleNoCumple = "¡Cumple!";
    } else {
      var DLimDElastCumpleNoCumple = "¡No cumple!";
    }

    // DLimDelastPorcentaje
    var DLimDelastPorcentaje = (DElastico / DLimite) * 100 + "%";

    salidas += `
        <tr>
            <th colspan="5" scope="col">VI. Analisis de deflexion</th>
        </tr>
        <tr>
            <td>Deflexión permitida</td>
            <td>L/360</td>
            <td>Δ lim</td>
            <td><span class="xlsx-cell" id="DefPermitida">${DefPermitida.toFixed(2)}</span></td>
            <td>cm</td>
        </tr>
        <tr>
            <td colspan="5" style="text-align: center">Δ lim =
            <span class="xlsx-cell" id="DLimite">${DLimite.toFixed(2)}</span>
            cm
            <span class="xlsx-cell" id="DLimiteDElasticoMayorMenor">${DLimiteDElasticoMayorMenor}</span>
            Δ Elas=
            <span class="xlsx-cell" id="DElastico">${DElastico.toFixed(2)}</span>
            cm
            <span class="xlsx-cell" id="DLimDElastCumpleNoCumple">${DLimDElastCumpleNoCumple}</span>
            <span class="xlsx-cell" id="DLimDelastPorcentaje">${DLimDelastPorcentaje}</span>
            </td>
        </tr>`;

    var tabla = document.getElementById("salidas");
    tabla.innerHTML = salidas;
  }
});
