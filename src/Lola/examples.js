import Blockly from "blockly/core";

function _sendXmlToWorkspace(xml, addXml) {

    if (addXml)
        xml = '<xml>' + xml + '</xml>';

    // confirm that xml is valid
    let dom = ''
    try {
        dom = Blockly.Xml.textToDom(xml);
    } catch (error) {
        alert(`Reading XML failed.\n${error}`);
        return
    }

    let confirmed = window.confirm(
        'CAUTION! The whole workspace will be cleared.\nWould you like to save your work by downloading XML?')

    if (confirmed)
        downloadAsXml()

    // clear variables
    Blockly.getMainWorkspace().clear()

    // write xml to workspace
    Blockly.Xml.domToWorkspace(dom, Blockly.getMainWorkspace());

}

function save(filename, data) {
    const blob = new Blob([data], {type: 'text/xml'});
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

function formatXML(xml, tab = '\t', nl = '\n') {
    let formatted = '', indent = '';
    const nodes = xml.slice(1, -1).split(/>\s*</);
    if (nodes[0][0] == '?') formatted += '<' + nodes.shift() + '>' + nl;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node[0] == '/') indent = indent.slice(tab.length); // decrease indent
        formatted += indent + '<' + node + '>' + nl;
        if (node[0] != '/' && node[node.length - 1] != '/' && node.indexOf('</') == -1) indent += tab;
    }
    return formatted;
}

export function importXml() {
    let xml = prompt('Paste your XML here', 'yourXML')

    // if something is entered
    if (xml)
        _sendXmlToWorkspace(xml, false)
    else
        alert("No XML entered")
}

export function downloadAsXml() {
    const dom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())
    const dom2 = Blockly.Xml.domToText(dom)
    const formattedXml = formatXML(dom2)
    save('blockly.xml', formattedXml)
}

export function shifterExample() {
    console.log('shifter.Lola')
}

export function counterExample() {
    const counterXml = `<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="2dCC:GHgeGc#UV;uybcT">leds</variable><variable id="9w!a}L6:WV6XfR[3#/G)">tick0</variable><variable id="S6a7AYYIDXi$a[Pa$=??">tick1</variable><variable id="23Z-6/;-X7HD19^Xu;I:">CLK50M</variable><variable id="p{VkT!3NS}|r+0kqUljL">rstIn</variable><variable id="4Bez?PrUbGS\`?9M*W\`j%">swi</variable><variable id="[][z;)*2y(Nf*a:g_,JY">cnt2</variable><variable id="f[6;xl0wa=%T|~bbi\`{s">rst</variable><variable id=";(K=Bvidac(/(P)NY)e1">cnt0</variable><variable id="oMg.3u/dqon*.L(7hId%">cnt1</variable></variables><block type="module_block_module_begin" id="E_0p\`DhYvW{#ckqyamv_" x="-162" y="-138"><field name="moduleName">Counter</field><statement name="module_parameters_input"><block type="variable_declaration_block" id="7VD|V{K,lWY6$MAccaeX"><field name="variable_in_out_type">IN</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="lists_create_with" id="i/:Mb8E/;NbBA%ko!,1f"><mutation items="2"></mutation><value name="ADD0"><block type="variables_name_get" id="#AxU5=lG7:NwyDRj$eUC"><field name="VAR" id="23Z-6/;-X7HD19^Xu;I:">CLK50M</field></block></value><value name="ADD1"><block type="variables_name_get" id="TPsD#4o@P}P;Vb3{}U1Z"><field name="VAR" id="p{VkT!3NS}|r+0kqUljL">rstIn</field></block></value></block></value><next><block type="variable_declaration_block" id=")_BbM@*X~;/xLf^b1NLD"><field name="variable_in_out_type">IN</field><field name="variable_type">BYTE</field><value name="variable_in_out"><block type="variables_name_get" id="0AJ8K@dD.G3f$}d6\`2?B"><field name="VAR" id="4Bez?PrUbGS\`?9M*W\`j%">swi</field></block></value><next><block type="variable_declaration_block" id="!69l|YeL8b=C~=+jh*qy"><field name="variable_in_out_type">OUT</field><field name="variable_type">BYTE</field><value name="variable_in_out"><block type="variables_name_get" id="ol?k1H7*(08?Cq8uhjOj"><field name="VAR" id="2dCC:GHgeGc#UV;uybcT">leds</field></block></value></block></next></block></next></block></statement><statement name="module_declaration_input"><block type="text_helper_statement" id="Ktn.T~/.I~c3TkiE?etI"><field name="text_help">REG (CLK50M) rst: BIT</field><next><block type="comment_block" id="|KHxgi{$XYcfnx!Hj5TA"><field name="comment">milliseconds</field><next><block type="variable_declaration_block_2" id="X\`=6yiLzhpQXagY\`FZ=5"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="h+p3Ett]vp:!,K?Z{t5H"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="+KE{Kb-1qX^^%80$^p4l"><field name="text_help">[16]</field></block></value><next><block type="comment_block" id="kSSw~5!!9AnK#M9FH~Sb"><field name="comment">halfseconds</field><next><block type="variable_declaration_block_2" id="@qftu#E;+VdBhgP]GfSt"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="#ujCwFH8X52n:cW0FAV}"><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="je%Dy|e@HiA.Q_X2;\`sn"><field name="text_help">[10]</field></block></value><next><block type="variable_declaration_block_2" id="$r5l4JJL):@t_auvIMx\`"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="Z5Z2[*+dJ81iAbSTV@@B"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="ehsHqB-ILb%I\`}Vw*J%g"><field name="text_help">[8]</field></block></value><next><block type="variable_declaration_block" id="MSY=!41C2OV[Fp-h:=_)"><field name="variable_in_out_type">VAR</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="lists_create_with" id="H7cOa{OL.B_.8b}j6*-W"><mutation items="2"></mutation><value name="ADD0"><block type="variables_name_get" id="Z\`.Hg#I[:A+z)%_bXPyE"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value><value name="ADD1"><block type="variables_name_get" id="Lo-:Z7SAGvp03[2qe!2K"><field name="VAR" id="S6a7AYYIDXi$a[Pa$=??">tick1</field></block></value></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></statement><statement name="begin_parameters_input"><block type="variables_set" id="/8g[6L3yZuU]|N+.I]#G"><field name="VAR" id="2dCC:GHgeGc#UV;uybcT">leds</field><value name="VALUE"><block type="math_arithmetic_three" id="sZ8USl(Vuk}T,Uk/)Fk-"><field name="OP">STATEMENT3</field><field name="OP2">STATEMENT5</field><value name="A"><block type="text_helper_variable" id=",n;%3Sor;x{6gGAA[OxD"><field name="text_help">swi.7</field></block></value><value name="B"><block type="variables_name_get" id="PJ3|dA)k-Gs;cUx^-/rr"><field name="VAR" id="4Bez?PrUbGS\`?9M*W\`j%">swi</field></block></value><value name="C"><block type="variables_name_get" id="$E_H#q=gP;i,aj(nlH2r"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field></block></value></block></value></block></statement><statement name="module_statements_input"><block type="variables_set" id="jVe$PG/f4s(3vwXjsP$f"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field><value name="VALUE"><block type="brackets_block" id="Q$KHn}3{=@#qr~V+O]Zs"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="lXBJf[XD=w1d32V[,DJ}"><field name="OP">STATEMENT6</field><value name="A"><block type="variables_name_get" id="|%RcY|knb@B4Hk8#tNBP"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field></block></value><value name="B"><block type="math_number" id="*I#lzS4Qz,+8m}SfDdyy"><field name="NUM">24999</field></block></value></block></value></block></value><next><block type="variables_set" id="wDOMG\`0%JWL=;/Kap[v0"><field name="VAR" id="S6a7AYYIDXi$a[Pa$=??">tick1</field><value name="VALUE"><block type="math_arithmetic" id="^?o?Eb[_7eO|vyc!DNB7"><field name="OP">STATEMENT1</field><value name="A"><block type="variables_name_get" id="q5b?+W#$]COc}w~@BJDW"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value><value name="B"><block type="brackets_block" id="#1t[\`bAxkUmE:2h_.Jgv"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="]6i6k%(,sI_H[-]UF}_t"><field name="OP">STATEMENT6</field><value name="A"><block type="variables_name_get" id="\`ao,sax9BGU$XN[y2ut^"><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field></block></value><value name="B"><block type="math_number" id="w/j3%E@3G+?,o,_m:K1;"><field name="NUM">499</field></block></value></block></value></block></value></block></value><next><block type="variables_set" id="bn\`{yEJH-hj:j/:^!^!A"><field name="VAR" id="f[6;xl0wa=%T|~bbi\`{s">rst</field><value name="VALUE"><block type="text_helper_variable" id="s)L#J1RC23Zkrx1@BxS["><field name="text_help">~rstIn</field></block></value><next><block type="variables_set" id="I)h,#w=E9e3R_=?QdK*Z"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field><value name="VALUE"><block type="math_arithmetic_three" id="rWjKl2jD,QNm)i}$K)VD"><field name="OP">STATEMENT5</field><field name="OP2">STATEMENT5</field><value name="A"><block type="math_arithmetic" id="+Vq?g@9[VI#@[ENPiZ0("><field name="OP">STATEMENT3</field><value name="A"><block type="text_helper_variable" id="8LD|^OajZGa-7*VR3Zl%"><field name="text_help">~rst</field></block></value><value name="B"><block type="math_number" id="I0C_#Snb#ut=zy}YhmCb"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="math_arithmetic" id="Q}eY(;hrQMj3kE:r$-TA"><field name="OP">STATEMENT3</field><value name="A"><block type="variables_name_get" id="P?N%l_yn@RM;5m6-q\`eA"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value><value name="B"><block type="math_number" id="5zGq(~H;2yvdVSNrES@U"><field name="NUM">0</field></block></value></block></value><value name="C"><block type="math_arithmetic" id="Jh.QNd!,\`9J/!@$]t3BD"><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id="Vpe#B$!Hg]I65()B#n:j"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field></block></value><value name="B"><block type="math_number" id="7^2UUS4TX%Aa_EckzbGH"><field name="NUM">1</field></block></value></block></value></block></value><next><block type="variables_set" id="?J:8*7id#uj}o_FlA5BF"><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field><value name="VALUE"><block type="math_arithmetic_three" id="hwU9lleVy0#[r6Ge90G4"><field name="OP">STATEMENT5</field><field name="OP2">STATEMENT5</field><value name="A"><block type="math_arithmetic" id=")\`T6,5VH4|lT??@RC!9?"><field name="OP">STATEMENT3</field><value name="A"><block type="text_helper_variable" id="M.C6$X9$7b?o5O(\`:nku"><field name="text_help">~rst</field></block></value><value name="B"><block type="math_number" id="J2^zY0SXviJ!!l,*^EU}"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="math_arithmetic" id="+gj=B;}4N@RBhW32q*PE"><field name="OP">STATEMENT3</field><value name="A"><block type="variables_name_get" id="3$=#3H)KI6*x.;H@xh}+"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value><value name="B"><block type="math_number" id="!f[29TTa;1.W098F=Lcb"><field name="NUM">0</field></block></value></block></value><value name="C"><block type="math_arithmetic" id="37a:Rm02j]gZAvdB5qXV"><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id="p=uc,EgjyIl}_Dw$j,Aw"><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field></block></value><value name="B"><block type="variables_name_get" id="7W4J3N?9jnwdEj$@){,X"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value></block></value></block></value><next><block type="variables_set" id="I0RYB7MVjZ|kd.u!)AFG"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field><value name="VALUE"><block type="math_arithmetic" id=":#/55f[\`|kt4/NSv@6Y#"><field name="OP">STATEMENT5</field><value name="A"><block type="math_arithmetic" id="CzvU_Zt49~gKUFWxxFth"><field name="OP">STATEMENT3</field><value name="A"><block type="text_helper_variable" id="kt.gp|L3AYIOna8/(Pkf"><field name="text_help">~rst</field></block></value><value name="B"><block type="math_number" id="^ieE3dj20yMM0el5Yrpf"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="math_arithmetic" id="+abNV}^z~4+[lk398XK)"><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id="qLG+no(\`r1c-ps0PvypB"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field></block></value><value name="B"><block type="variables_name_get" id="v/Ns1_d2;CeE*G;K;$y8"><field name="VAR" id="S6a7AYYIDXi$a[Pa$=??">tick1</field></block></value></block></value></block></value></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`
    _sendXmlToWorkspace(counterXml, false)
}

export function riscExample() {
    console.log('risc example')
}

export function leftShifterExample() {
    const leftShifterXml = `<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="9$=lDX?op?ipZ(R7XE^i">t1</variable><variable id="[}OtT\`3FPRJXz06kV[\`W">x</variable><variable id="McPDZZIlxDPlz22ats}J">t2</variable><variable id="5j(|V,l@9ECIFMzkw2{}">sc</variable><variable id="FMKQqe?GDrT]U|ejp5FW">y</variable></variables><block type="module_block_module_begin" id="}3idX^e,h!OEN-QDgDRO" x="88" y="13"><field name="moduleName">LeftShifter</field><statement name="module_parameters_input"><block type="variable_declaration_block" id=";X.g\`oeNmp\`(xfb]f.2r"><field name="variable_in_out_type">IN</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id=";aZI1UMTHZTK[e^e(?s#"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value><next><block type="variable_declaration_block_2" id="fH6ebGla1|%3I8?GTz9."><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="MdYuE7\`t{O58O)l]Vi9C"><field name="VAR" id="5j(|V,l@9ECIFMzkw2{}">sc</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="knKy0}SF-5l:P#W-Bu(j"><field name="text_help">[5]</field></block></value><next><block type="variable_declaration_block" id="te|2[X^jwEJ3rSXckcTM"><field name="variable_in_out_type">IN</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id="L^dRzxbhmBWrJRABkIJJ"><field name="VAR" id="FMKQqe?GDrT]U|ejp5FW">y</field></block></value></block></next></block></next></block></statement><statement name="module_declaration_input"><block type="text_helper_statement" id="(w,%ZanG_-k}_G#RpWe/"><field name="text_help">VAR sc0, sc1: [2] BIT</field><next><block type="text_helper_statement" id="RT-o(EZ97=j~t7EAy$,#"><field name="text_help">t1, t2: WORD</field></block></next></block></statement><statement name="begin_parameters_input"><block type="text_helper_statement" id="!M(}KD6ebV!YFLn$?8C3"><field name="text_help">sc0 := sc[1:0]; sc1 := sc[3:2]</field></block></statement><statement name="module_statements_input"><block type="variables_set" id="bnW*zq)7\`XdG|^_4hAon"><field name="VAR" id="9$=lDX?op?ipZ(R7XE^i">t1</field><value name="VALUE"><block type="text_helper_variable" id="xNoev|d)c2BX^-czf2EF"><field name="text_help">(sc0 = 3) -&gt; {x[28:0], 0'3} : (sc0 = 2) -&gt; {x[29:0], 0'2} : (sc0 = 1) -&gt; {x[30:0], 0'1} : x</field></block></value><next><block type="variables_set" id="p0[jz4Pn}\`qAJO~h3Ga4"><field name="VAR" id="McPDZZIlxDPlz22ats}J">t2</field><value name="VALUE"><block type="text_helper_variable" id="OT=A^}kvd6ky,A$T8\`\`j"><field name="text_help">(sc1 = 3) -&gt; {t1[19:0], 0'12} : (sc1 = 2) -&gt; {t1[23:0], 0'8} : (sc1 = 1) -&gt; {t1[27:0], 0'4} : t1</field></block></value><next><block type="variables_set" id="sFR}gr\`3e?I*dD/cIWfr"><field name="VAR" id="FMKQqe?GDrT]U|ejp5FW">y</field><value name="VALUE"><block type="text_helper_variable" id="[}iX{y4p}Qg#0e-:7hhl"><field name="text_help">sc.4 -&gt; {t2[15:0], 0'16} : t2</field></block></value></block></next></block></next></block></statement></block></xml>`
    _sendXmlToWorkspace(leftShifterXml, false)
}

export function rightShifterExample() {
    console.log('Right Shifter example')
}

export function multiplierExample() {

    const multiplierXml = `<?xml version="1.0"?>
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="+T!Fp4L%0-zC,}qqNiJ1">stall</variable>
    <variable id="aEAkGv5ypVrf)4r/|8pW">w0</variable>
    <variable id="|2,yIGcN{$4Rl}sC#QVs">w1</variable>
    <variable id="Er?FJ1n^??8kk*nW0mZo">clk</variable>
    <variable id="2VtR;;@2LqmzIJ([KMh%">run</variable>
    <variable id="}pe0fK|C{_raoHngVN_N">u</variable>
    <variable id="(4N02orxBE#u}Q[hssx6">S</variable>
    <variable id="HUsTxWU1$f_sO:8*m:gM">y</variable>
    <variable id="BIHk20w+u5tPnobX/e9=">P</variable>
    <variable id="-9nT5@5Slh4zRLxCeF5\`">x</variable>
    <variable id="qtSQh}/)?|c{Fe58P+f]">z</variable>
  </variables>
  <block type="module_block_module_begin" id="stGo}VRjQPGVM!3HxM6[" x="-688" y="102">
    <field name="moduleName">Multiplier</field>
    <statement name="module_parameters_input">
      <block type="variable_declaration_block" id="j}^(0VR]]mZl2frMo~iy">
        <field name="variable_in_out_type">IN</field>
        <field name="variable_type">BIT</field>
        <value name="variable_in_out">
          <block type="lists_create_with" id="!)t1la~z+CRV%t\`]T;Vz">
            <mutation items="3"/>
            <value name="ADD0">
              <block type="variables_name_get" id="F7#fa}(~P3|^!]lJlNZ+">
                <field name="VAR" id="Er?FJ1n^??8kk*nW0mZo">clk</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="variables_name_get" id="BkmK3V6g3P,z]m)|Wh,1">
                <field name="VAR" id="2VtR;;@2LqmzIJ([KMh%">run</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="variables_name_get" id=",,Id78myF+QX??u4Rxfr">
                <field name="VAR" id="}pe0fK|C{_raoHngVN_N">u</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="variable_declaration_block" id="8~[hVd9dMN)rF$.G^Co)">
            <field name="variable_in_out_type">OUT</field>
            <field name="variable_type">BIT</field>
            <value name="variable_in_out">
              <block type="variables_name_get" id="~zBMEw)ls.Or03U*j5[-">
                <field name="VAR" id="+T!Fp4L%0-zC,}qqNiJ1">stall</field>
              </block>
            </value>
            <next>
              <block type="variable_declaration_block" id="6!K;w,5Ha,/feHqG~DE{">
                <field name="variable_in_out_type">IN</field>
                <field name="variable_type">WORD</field>
                <value name="variable_in_out">
                  <block type="lists_create_with" id="v%Z,v9M)Q2rDo4juYp5~">
                    <mutation items="2"/>
                    <value name="ADD0">
                      <block type="variables_name_get" id="jaRDSV)iC\`R8+,7,~;X;">
                        <field name="VAR" id="-9nT5@5Slh4zRLxCeF5\`">x</field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="variables_name_get" id="V0x+o5AXgO\`{w;y+SkSn">
                        <field name="VAR" id="HUsTxWU1$f_sO:8*m:gM">y</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
                  <block type="text_helper_statement" id="ip5K:F)^]4Jt6_^Xf{bZ">
                    <field name="text_help">OUT z: [64] BIT</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <statement name="module_declaration_input">
      <block type="text_helper_statement_no_semicolon" id="7*0j,KBByEv5WgpyM%Ut">
        <field name="text_help">REG (clk)</field>
        <next>
          <block type="variable_declaration_block_2" id="O{fGYz.v=dQmG*Xx.AcZ">
            <field name="variable_type">BIT</field>
            <value name="variable_name">
              <block type="variables_name_get" id="w~A:~j::5V8H3f/l#1==">
                <field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field>
              </block>
            </value>
            <value name="variable_in_out">
              <block type="text_helper_variable" id="rY#(:kHfa8j1NMJy;Pnr">
                <field name="text_help">[6]</field>
              </block>
            </value>
            <next>
              <block type="variable_declaration_block_2" id="2mMU7+]*YX[}E?/c?^J}">
                <field name="variable_type">BIT</field>
                <value name="variable_name">
                  <block type="variables_name_get" id="nGAB*kfDSVmyrLSYsni1">
                    <field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field>
                  </block>
                </value>
                <value name="variable_in_out">
                  <block type="text_helper_variable" id="1OQizW1d/nXJImPi?0nV">
                    <field name="text_help">[64]</field>
                  </block>
                </value>
                <next>
                  <block type="variable_declaration_block" id="eh{6St:Z%=MNT;_pH3k2">
                    <field name="variable_in_out_type">VAR</field>
                    <field name="variable_type">WORD</field>
                    <value name="variable_in_out">
                      <block type="variables_name_get" id="}_89wI\`M$8tMb$/wWO)!">
                        <field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field>
                      </block>
                    </value>
                    <next>
                      <block type="variable_declaration_block_2" id="%;Y4t]-A,]LdRP?lPjD-">
                        <field name="variable_type">BIT</field>
                        <value name="variable_name">
                          <block type="variables_name_get" id="9n@NR-aWvkTW/xXvjdoQ">
                            <field name="VAR" id="|2,yIGcN{$4Rl}sC#QVs">w1</field>
                          </block>
                        </value>
                        <value name="variable_in_out">
                          <block type="text_helper_variable" id="4GF6}lIw!YB9v,UeDHfm">
                            <field name="text_help">[33]</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
    <statement name="begin_parameters_input">
      <block type="variables_set" id="WYyzwVRWaB8uP:ce5W^D">
        <field name="VAR" id="+T!Fp4L%0-zC,}qqNiJ1">stall</field>
        <value name="VALUE">
          <block type="math_arithmetic" id="QEG\`Yx:nHr85-S-JZX4Y">
            <field name="OP">STATEMENT1</field>
            <value name="A">
              <block type="variables_name_get" id="LyKPj;+l0eKehCDWu#Zx">
                <field name="VAR" id="2VtR;;@2LqmzIJ([KMh%">run</field>
              </block>
            </value>
            <value name="B">
              <block type="brackets_block" id="j*^r;,;PUhg,guuffY./">
                <field name="bracketsLeft">normalLeft</field>
                <field name="bracketsRight">normalRight</field>
                <value name="variableInside">
                  <block type="math_arithmetic" id="Sh0](l14nuULqjqPeBmq">
                    <field name="OP">STATEMENT2</field>
                    <value name="A">
                      <block type="variables_name_get" id="N@jw?W?-%6{|:Gq\`e%OK">
                        <field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_number" id="BLo[\`yS{V4$dH}o#PP:y">
                        <field name="NUM">33</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
      </block>
    </statement>
    <statement name="module_statements_input">
      <block type="variables_set" id="/3v1(T}Wu%suAT{GEMNS">
        <field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field>
        <value name="VALUE">
          <block type="math_arithmetic_three" id="}*[6[L\`nOeYe:s5k}Zoe">
            <field name="OP">STATEMENT3</field>
            <field name="OP2">STATEMENT5</field>
            <value name="A">
              <block type="text_helper_variable" id="pB|Wl\`LEn4OER6nT*]7)">
                <field name="text_help">P.0</field>
              </block>
            </value>
            <value name="B">
              <block type="variables_name_get" id="ba[eaA6Ml1%i~FLA,v8L">
                <field name="VAR" id="HUsTxWU1$f_sO:8*m:gM">y</field>
              </block>
            </value>
            <value name="C">
              <block type="math_number" id="=VCVt!yW_5]YyAu.flA?">
                <field name="NUM">0</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="variables_set" id="{X{w$cTk)0w2DV+5*a51">
            <field name="VAR" id="|2,yIGcN{$4Rl}sC#QVs">w1</field>
            <value name="VALUE">
              <block type="math_arithmetic_three" id="Eh800e_$^f{?3C2|=)hd">
                <field name="OP">STATEMENT1</field>
                <field name="OP2">STATEMENT3</field>
                <value name="A">
                  <block type="brackets_block" id="A;1]^t5Gv+)9d)mtIxZ%">
                    <field name="bracketsLeft">normalLeft</field>
                    <field name="bracketsRight">normalRight</field>
                    <value name="variableInside">
                      <block type="math_arithmetic" id="tAmnvZ7DZOY;FY5{KmgG">
                        <field name="OP">STATEMENT6</field>
                        <value name="A">
                          <block type="variables_name_get" id="-sI/b-jL19=/(Ew(Od+w">
                            <field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number" id="u7(6DCYlm$h@@m;CK_a:">
                            <field name="NUM">32</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="B">
                  <block type="variables_name_get" id="vqD..V-eM@qT-HvUD(Q+">
                    <field name="VAR" id="}pe0fK|C{_raoHngVN_N">u</field>
                  </block>
                </value>
                <value name="C">
                  <block type="math_arithmetic" id="A8o;=$Sr9pT0\`wriHxOE">
                    <field name="OP">STATEMENT5</field>
                    <value name="A">
                      <block type="math_arithmetic" id="D:5WsEfN~m/V1,tmpmm:">
                        <field name="OP">MINUS</field>
                        <value name="A">
                          <block type="brackets_block" id="P77YqS^+0N-w%sn(9m/T">
                            <field name="bracketsLeft">curlyLeft</field>
                            <field name="bracketsRight">curlyRight</field>
                            <value name="variableInside">
                              <block type="lists_create_with" id=".FD+!sksPpuis0f4?;4J">
                                <mutation items="2"/>
                                <value name="ADD0">
                                  <block type="text_helper_variable" id="dFrwSjv?[]+1*U\`VsuIf">
                                    <field name="text_help">P.63</field>
                                  </block>
                                </value>
                                <value name="ADD1">
                                  <block type="text_helper_variable" id="g8XobL(Ix{7RtAgHlNdG">
                                    <field name="text_help">P[63:32]</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="B">
                          <block type="brackets_block" id="iqpr,O=/$kn$Z7I0{3}c">
                            <field name="bracketsLeft">curlyLeft</field>
                            <field name="bracketsRight">curlyRight</field>
                            <value name="variableInside">
                              <block type="lists_create_with" id="JHR})Mo.[XX_2vl-4@h]">
                                <mutation items="2"/>
                                <value name="ADD0">
                                  <block type="text_helper_variable" id="nzFahWiAtuE00yE)diJO">
                                    <field name="text_help">w0.31</field>
                                  </block>
                                </value>
                                <value name="ADD1">
                                  <block type="text_helper_variable" id="qQQQb.(Q8b58#eYzlDA6">
                                    <field name="text_help">w0</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_arithmetic" id="ff.q0b@t\`8_XUg(1+jg/">
                        <field name="OP">ADD</field>
                        <value name="A">
                          <block type="brackets_block" id="1dl:BN|amA,Ff]zYt{1:">
                            <field name="bracketsLeft">curlyLeft</field>
                            <field name="bracketsRight">curlyRight</field>
                            <value name="variableInside">
                              <block type="lists_create_with" id="57Q+CZbu^C5TLiGzP5W3">
                                <mutation items="2"/>
                                <value name="ADD0">
                                  <block type="text_helper_variable" id="HlAH_NF*kPeh/DE9]Mc*">
                                    <field name="text_help">P.63</field>
                                  </block>
                                </value>
                                <value name="ADD1">
                                  <block type="text_helper_variable" id="/$E.R39hs3_|7,QCQ6;,">
                                    <field name="text_help">P[63:32]</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="B">
                          <block type="brackets_block" id="cl!V1pC4IV+.7Zxm1W}s">
                            <field name="bracketsLeft">curlyLeft</field>
                            <field name="bracketsRight">curlyRight</field>
                            <value name="variableInside">
                              <block type="lists_create_with" id="bb[#o}@ft{$^)hra4=b~">
                                <mutation items="2"/>
                                <value name="ADD0">
                                  <block type="text_helper_variable" id="P;CuK]sau$pJg@ml.-IK">
                                    <field name="text_help">w0.31</field>
                                  </block>
                                </value>
                                <value name="ADD1">
                                  <block type="text_helper_variable" id="X\`*(r#Se6Izq]o+=1aap">
                                    <field name="text_help">w0</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="variables_set" id=":_--73CEInJ_*2L[Rmbk">
                <field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field>
                <value name="VALUE">
                  <block type="math_arithmetic" id="8:2jdZZ0Y$lih9|pXK]n">
                    <field name="OP">STATEMENT3</field>
                    <value name="A">
                      <block type="variables_name_get" id="WcBtiP6X~NE:=6:u.d-T">
                        <field name="VAR" id="2VtR;;@2LqmzIJ([KMh%">run</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_arithmetic_three" id="*q!It2cm)i$R$3s.dm.[">
                        <field name="OP">ADD</field>
                        <field name="OP2">STATEMENT5</field>
                        <value name="A">
                          <block type="variables_name_get" id="yu,KAa,JHnQ6dM//;^|U">
                            <field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number" id="IMI_u[O]1}LU4Z=Ra2!/">
                            <field name="NUM">1</field>
                          </block>
                        </value>
                        <value name="C">
                          <block type="math_number" id="$t6XyKBpD$/u9\`sh{_1e">
                            <field name="NUM">0</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
                  <block type="variables_set" id="h8v2_qy?+zC*z#f6H:[e">
                    <field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field>
                    <value name="VALUE">
                      <block type="math_arithmetic_three" id="-Q0Gx:nC2!jB_4R*mk)5">
                        <field name="OP">STATEMENT3</field>
                        <field name="OP2">STATEMENT5</field>
                        <value name="A">
                          <block type="brackets_block" id="TDnW07:?;gJw4$JjrjD-">
                            <field name="bracketsLeft">normalLeft</field>
                            <field name="bracketsRight">normalRight</field>
                            <value name="variableInside">
                              <block type="math_arithmetic" id=";)/Kw*9WBfYbfnj8lQcj">
                                <field name="OP">STATEMENT6</field>
                                <value name="A">
                                  <block type="variables_name_get" id="b/lS(tn4):tXNfx(dnrb">
                                    <field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field>
                                  </block>
                                </value>
                                <value name="B">
                                  <block type="math_number" id="kkK8#VK_ju_}x4@po.Lo">
                                    <field name="NUM">0</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="B">
                          <block type="brackets_block" id="/PV!Z.g]ri|X)|:+W[Xl">
                            <field name="bracketsLeft">curlyLeft</field>
                            <field name="bracketsRight">curlyRight</field>
                            <value name="variableInside">
                              <block type="lists_create_with" id=")c^Kx}c9Vs*fc(39H;UJ">
                                <mutation items="2"/>
                                <value name="ADD0">
                                  <block type="text_helper_variable" id="n5v{#09T,T%Tf6X?5SaU">
                                    <field name="text_help">0'32</field>
                                  </block>
                                </value>
                                <value name="ADD1">
                                  <block type="variables_name_get" id="wUCzG1xtu7*w3yIK6|ti">
                                    <field name="VAR" id="-9nT5@5Slh4zRLxCeF5\`">x</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="C">
                          <block type="brackets_block" id="l$S1(9J?$6C|EaH|d@D)">
                            <field name="bracketsLeft">curlyLeft</field>
                            <field name="bracketsRight">curlyRight</field>
                            <value name="variableInside">
                              <block type="lists_create_with" id="KE8W}=j)@q|yn$9IDOh}">
                                <mutation items="2"/>
                                <value name="ADD0">
                                  <block type="text_helper_variable" id="QsJ..rmYUp}+,,.0#g*T">
                                    <field name="text_help">w1[32:0]</field>
                                  </block>
                                </value>
                                <value name="ADD1">
                                  <block type="text_helper_variable" id="eh1ZthsM{Fdxt[gV;u8s">
                                    <field name="text_help">P[31:1]</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                    <next>
                      <block type="variables_set" id=":H]nMmGIKQQz{Px|T=Oj">
                        <field name="VAR" id="qtSQh}/)?|c{Fe58P+f]">z</field>
                        <value name="VALUE">
                          <block type="variables_name_get" id=",CYCosdbcbwq0Vc9lb5S">
                            <field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field>
                          </block>
                        </value>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`
    _sendXmlToWorkspace(multiplierXml, false)
}

export function dividerExample() {
    console.log('Divider example')
}

export function fpaAdderExample() {
    console.log('fpaAdder example')
}

export function fpMultiplierExample() {
    console.log('fpMultiplier example')
}

export function fpDividerExample() {
    console.log('fpDivider example')
}