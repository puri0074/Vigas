<?php
session_start();
/* if ($_SESSION['us_tipo'] == 1 || $_SESSION['us_tipo'] == 2) { */
if (1 == 1 || 1 == 1) {
?>

    <head>
        <title>Adm | DISEÑO DE PLACAS EN FORMA DE L</title>
        <style>
            #formContainer {
                height: 100%;
                overflow-y: auto;
            }
        </style>
    </head>

    <?php
    include_once "assets/views/header.php";
    include_once "assets/views/nav.php";
    ?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <!--Titulo de la pagina-->
                        <h1>DISEÑO DE VIGAS DE ACERO</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="../adm_principal.php">Inicio</a></li>
                            <li class="breadcrumb-item active">DISEÑO DE VIGAS DE ACERO</li>
                        </ol>
                    </div>
                </div>
            </div>

            <!-- /.container-fluid -->
        </section>

        <section class="content">
            <div class="card">
                <div class="row">
                    <div class="col-4">
                        <div class="card-header" style="font-size: 50px;">Datos</div>
                        <div class="card-body">
                            <h1 aling="center" style="font-size: 30px">Datos de Entrada</h1>

                            <!--Entrada 01-->

                            <div class="container-fluid">
                                <label for="tviga">Tipo de Viga</label>
                                <div class="row">
                                    <div class="col"><span>Tv</span></div>
                                    <div class="col"><select name="tviga" id="tviga" class="xlsx-cell Vigas" data-selected="W14X30">
                                        </select>-</div>
                                    <div class="col"><span>-</span></div>
                                </div>
                            </div>
                            <table>
                                
                                <!--Entrada 02--->
                            <div class="card text-center">
                                <label for="ultdiseño">Momento Último de diseño</label>
                                <div class="row">
                                    <div class="col"><span>Mu</span> </div>
                                    <div class="col"><input type="text" id="ultdiseño" name="ultdiseño" value="6.2" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>Ton-m</span></div>
                                </div>
                            </div>

                                <!----Entrada 03---->
                            <div class="card text-center">
                                <label for="cortultimo">Cortante último de diseño</label>
                                <div class="row">
                                    <div class="col"><span>Vu</span> </div>
                                    <div class="col"><input type="text" id="cortultimo" name="cortultimo" value="4.5" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>Ton</span></div>
                                </div>
                            </div>

                                <!---Entrada 04--->
                            <div class="card text-center">
                                <label for="ΔElas">Deflexion calculada</label>
                                <div class="row">
                                    <div class="col"><span>ΔElas</span> </div>
                                    <div class="col"><input type="text" id="defcalculada" name="defcalculada" value="0.6" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>cm</span></div>
                                </div>
                            </div>

                                <!---Entrada 05---->
                            <div class="card text-center">
                                <label for="L">Longitud de la Viga</label>
                                <div class="row">
                                    <div class="col"><span>L</span> </div>
                                    <div class="col"><input type="text" id="Lviga" name="Lviga" value="5" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>m</span></div>
                                </div>
                            </div>

                                <!---Entrada 06--->
                            <div class="card text-center">
                                <label for="Lb">Longitud de trabajo libre de arriostramiento</label>
                                <div class="row">
                                    <div class="col"><span>Lb</span> </div>
                                    <div class="col"><input type="text" id="Ltrabajo" name="Ltrabajo" value="1" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>m</span></div>
                                </div>
                            </div>

                                <!--salida-->
                            <div class="container-fluid">
                                <label for="-">Tipo de Acero</label>
                                <div class="row">
                                    <div class="col"><span>Ta</span></div>
                                    <div class="col"><select name="Tacero" id="Tacero" class="xlsx-cell Aceros
                                    " data-selected="A-572 Gr. 50">
                                        </select>-</div>
                                    <div class="col"><span>-</span></div>
                                </div>
                            </div>

                                <!--Entrada 08-->
                            <div class="card text-center">
                                <label for="Es =">Módulo de elasticidad del Acero</label>
                                <div class="row">
                                    <div class="col"><span>Es =</span> </div>
                                    <div class="col"><input type="text" id="Modelasticidad" name="Modelasticidad" value="2039432.425" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>kg/cm2</span></div>
                                </div>
                            </div>
                                
                                <!---Entrada 09---->
                            <div class="card text-center">
                                <label for="-">Tiene regidizadores ?</label>
                                <div class="row">
                                    <div class="col"><span>Tr</span></div>
                                    <div class="col"><select name="Tregidizadores" id="Tregidizadores" class="xlsx-cell">
                                            <option value="Si">Si</option>
                                            <option value="No" selected>No</option>
                                        </select>-</div>
                                    <div class="col"><span>-</span></div>
                                </div>
                            </div>    
                               <!----Entrada que faltaba entrada oculto----->
                               <div id="SeparacionRegiContenedor" class="card text-center d-none">
                                <label for="-">Separación entre regidizadores</label>
                                <div class="row">
                                    <div class="col"><span>a =</span> </div>
                                    <div class="col"><input type="text" id="SeparacionRegi" name="SeparacionRegi" value="-" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>m</span></div>
                                </div>
                            </div>
                                <!----Entrada-10-->
                            <div class="card text-center">
                                <label for="Cb =">Factor de modificación de pandeo lateral</label>
                                <div class="row">
                                    <div class="col"><span>Cb =</span> </div>
                                    <div class="col"><input type="text" id="Factormod" name="Factormod" value="1" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>-</span></div>
                                </div>
                            </div>
                                <!--Entrada 11-->
                            <div class="card text-center">
                                <label for="øb">Donde:</label>
                                <div class="row">
                                    <div class="col"><span>øb</span> </div>
                                    <div class="col"><input type="text" id="donde1" name="donde1" value="0.9" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>-</span></div>
                                </div>
                            </div>
                            <!---Entrada 12--->
                            <div class="card text-center">
                                <label for="øc =">Donde:</label>
                                <div class="row">
                                    <div class="col"><span>øc =</span> </div>
                                    <div class="col"><input type="text" id="donde2" name="donde2" value="0.9" class="form-control xlsx-cell"></div>
                                    <div class="col"><span>-</span></div>
                                </div>
                            </div>

                            </table>
                            
                            <!---Término de datos de entrada-->
                            <div class="card text-center">
                            </div>
                        </div>
                        <div class="card-footer"></div>
                    </div>
                    <div class="col-8">
                        <div class="card-header bg-primary"></div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Simbologia</th>
                                        <th>Formula</th>
                                        <th>Resultado</th>
                                        <th>Unidad de Medida</th>
                                    </tr>
                                </thead>

                                <!--Segundo Plano Datos de Salida-->
                                <!---Salida 01-->

                                <tbody id="entradas">
                                </tbody>
                                <tbody id="salidas">
                                <tr>
                                    <th colspan="5" scope="col">I. Datos de salida</th>
                                </tr>

                                <!--01-->
                                <tr>
                                    <td>Esfuerzo de fluencia de acero</td>
                                    <td>Fy =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="EsfuerzoAcero">3515.349</span></td>
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
                                    <td><span class="xlsx-cell" id="PeralteViga">35.052</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Longitud Libre del Alma</td>
                                    <td>T =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="LongitudLibre">29.527</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Ancho del Patín</td>
                                    <td>bf =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="AnchoPatin">17.094</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Espersor del Patín</td>
                                    <td>tf =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="EspersorPatin">0.977</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Espesor del Alma</td>
                                    <td>tw =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="EspersorAlma">0.685</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Inercia en X</td>
                                    <td>Ixx =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="InerciaX">12112.334</span></td>
                                    <td>cm4</td>
                                </tr>
                                <tr>
                                    <td>Inercia en Y</td>
                                    <td>Iyy =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="InerciaY">815.813</span></td>
                                    <td>cm4</td>
                                </tr>

                                <!--La  otra Mitad-->
                                <tr>
                                    <td>Módulo de alabeo</td>
                                    <td>Cw =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="ModuloAlabeo">238191.313</span></td>
                                    <td>cm6</td>
                                </tr>
                                <tr>
                                    <td>Módulo de torsión</td>
                                    <td>J =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="ModuloTorsion">15.816</span></td>
                                    <td>cm4</td>
                                </tr>
                                <tr>
                                    <td>Módulo de Plástico</td>
                                    <td>Zx =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="ModuloPlastico">775.108</span></td>
                                    <td>cm3</td>
                                </tr>
                                <tr>
                                    <td>Módulo elástico</td>
                                    <td>Sx =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="ModElastico">688.256</span></td>
                                    <td>cm3</td>
                                </tr>
                                <tr>
                                    <td>Radio de giro efectivo</td>
                                    <td>rT =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="GiroEfectivo">4.495</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Radio de giro en Y</td>
                                    <td>ry =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="GiroY">3.784</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Dist. Entre centros de patin</td>
                                    <td>ho =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="CentroPatin">34.074</span></td>
                                    <td>cm</td>
                                </tr>

                                <!--03-->
                                <tr>
                                    <th colspan="5" scope="col">III. Esbeltez Local</th>
                                </tr>
                                <th colspan="" scope="">3.1. Revisión del pandeo local en los patines</th>
                                <tr>
                                    <td>Limite Inferior de esbeltez en el patín</td>
                                    <td>𝜆p =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="LimiteInferior">9.152</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Limite Superior de esbeltez en el patín</td>
                                    <td>𝜆r =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="LimiteSuperior">24.086</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Límite de esbeltez en el Patin</td>
                                    <td>𝜆 =</td>
                                    <td>bf /(2tf)</td>
                                    <td><span class="xlsx-cell" id="LimiteEsbeltez">8.740</span></td>
                                    <td>Compacto</td>
                                </tr>
                                <th colspan="5" scope="col">3.2. Revisión del pandeo local en el alma</th>

                                <!--La otra mitad--->
                                <tr>
                                    <td>Limite Inferior de esbeltez en el Alma</td>
                                    <td>𝜆p =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="limiteInferiorAlma">90.564</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Limite Superior de esbeltez en el Alma</td>
                                    <td>𝜆r =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="LimiteSuperiorAlma">137.292</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Límite de esbeltez en el Alma</td>
                                    <td>𝜆 =</td>
                                    <td>T /(tw)</td>
                                    <td><span class="xlsx-cell" id="LimiteEsbeltezAlma">43.055</span></td>
                                    <td>Compacto</td>
                                </tr>

                                <!---04--->
                                <tr>
                                    <th colspan="5" scope="col">IV. Resistencia a flexión</th>
                                </tr>
                                <tr>
                                    <td>Longitud plástico</td>
                                    <td>Zona 1</td>
                                    <td>Mp1 =</td>
                                    <td><span class="xlsx-cell" id="LPlastico">2724775.795</span></td>
                                    <td>kg-cm</td>
                                </tr>
                                <tr>
                                    <td>Longitud Elástico</td>
                                    <td>Zona 2</td>
                                    <td>Mn2 =</td>
                                    <td><span class="xlsx-cell" id="LElastico">2724775.795</span></td>
                                    <td>kg-cm</td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td>Zona 3</td>
                                    <td>Mn3 =</td>
                                    <td><span class="xlsx-cell" id="Zon3">2724775.7955537676</span></td>
                                    <td>kg-cm</td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td>Lp =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="Lp">160.43646037698065</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td>Lr =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="Lr">452.7737675911463</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Donde:</td>
                                    <td>Lb =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="D">100.0</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>Momento Resistencia a flexión, Ton-m</td>
                                    <td>Mp1</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="MomentoResistencia">27.247</span></td>
                                    <td>Zona 1</td>
                                </tr>
                                <tr>
                                    <td colspan="5">øMn =
                                    <span class="xlsx-cell" id="F59">24.52298215998391</span>
                                    Ton-m
                                    <span class="xlsx-cell" id="H59">&gt;</span>
                                    Mu =
                                    <span class="xlsx-cell" id="J59">6.2</span>
                                    Ton-m
                                    <span class="xlsx-cell" id="M59">¡Cumple!</span>
                                    <span class="xlsx-cell" id="N59">0.25282406354790854</span>
                                    </td>
                                </tr>

                                <!---05-->
                                <tr>
                                    <th colspan="5" scope="col">V. Resistencia a cortante</th>
                                </tr>
                                <tr>
                                    <td>Coeficiente de pandeo de placa</td>
                                    <td>Kv</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="CoeficientePandeo">5.0</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td>h/tw =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="Tw">43.055</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Limite Inferior</td>
                                    <td>√(𝐾𝑣 𝐸/𝐹𝑦)</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="LInferior">59.244</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Limite Superior</td>
                                    <td>√(𝐾𝑣 𝐸/𝐹𝑦)  </td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="LSuperior">73.786</span></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Coeficiente Cv</td>
                                    <td>Cv =</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="Coefcv">1.0</span></td>
                                    <td>Zona 1</td>
                                </tr>
                                <tr>
                                    <td>Área de Cortante</td>
                                    <td>Aw = d*tw</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="ACortante">24.038</span></td>
                                    <td>cm2</td>
                                </tr>
                                <tr>
                                    <td>Resistencia a Cortante</td>
                                    <td>Vn = 0.6*Fy*Aw * C</td>
                                    <td>-</td>
                                    <td><span class="xlsx-cell" id="ResistCortante">50702.575</span></td>
                                    <td>Kg</td>
                                </tr>
                                <tr>
                                    <td colspan="5">øVn =
                                    <span class="xlsx-cell" id="F80">45.632317521649405</span>
                                    Ton
                                    <span class="xlsx-cell" id="H80">&gt;</span>
                                    Vu =
                                    <span class="xlsx-cell" id="J80">4.5</span>
                                    Ton
                                    <span class="xlsx-cell" id="M80">¡Cumple!</span>
                                    <span class="xlsx-cell" id="N80">0.09861432082350537</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th colspan="5" scope="col">VI. Analisis de deflexion</th>
                                </tr>
                                <tr>
                                    <td>Deflexión permitida</td>
                                    <td>L/360</td>
                                    <td>Δ lim</td>
                                    <td><span class="xlsx-cell" id="DefPermitida">1.3888888888888888</span></td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td colspan="5">Δ lim =
                                    <span class="xlsx-cell" id="F85">1.3888888888888888</span>
                                    cm
                                    <span class="xlsx-cell" id="H85">&gt;</span>
                                    Δ Elas=
                                    <span class="xlsx-cell" id="J85">0.6</span>
                                    cm
                                    <span class="xlsx-cell" id="M85">¡Cumple!</span>
                                    <span class="xlsx-cell" id="N85">0.432</span>
                                    </td>
                                </tr>
                               </tbody>
                            </table>
                        </div>
                    </div>
        </section>
    </div>
    <script type="module" src="js/adm_Vigas.js"></script>
<?php
    include_once "assets/views/footer.php";
} else {
    header('Location: ../login.php');
}
?>