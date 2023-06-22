import {sendXmlToWorkspace} from '../buttonMethods'
import {toastInfo} from "../userAlerts";
import {save} from "../util"

export function shifterExample() {
    toastInfo("Shifter example is not implemented yet")
}

export function counterExample() {
    const counterXml = `<?xml version="1.0"?><xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="2dCC:GHgeGc#UV;uybcT">leds</variable><variable id="9w!a}L6:WV6XfR[3#/G)">tick0</variable><variable id="23Z-6/;-X7HD19^Xu;I:">CLK50M</variable><variable id="p{VkT!3NS}|r+0kqUljL">rstIn</variable><variable id="4Bez?PrUbGS\`?9M*W\`j%">swi</variable><variable id="f[6;xl0wa=%T|~bbi\`{s">rst</variable><variable id="[][z;)*2y(Nf*a:g_,JY">cnt2</variable><variable id="S6a7AYYIDXi$a[Pa$=??">tick1</variable><variable id=";(K=Bvidac(/(P)NY)e1">cnt0</variable><variable id="oMg.3u/dqon*.L(7hId%">cnt1</variable></variables><block type="module_block_module_begin" id="E_0p\`DhYvW{#ckqyamv_" x="-712" y="-12"><field name="moduleName">Counter</field><statement name="module_parameters_input"><block type="variable_declaration_block" id="7VD|V{K,lWY6$MAccaeX"><field name="variable_in_out_type">IN</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="lists_create_with" id="i/:Mb8E/;NbBA%ko!,1f"><mutation items="2"/><value name="ADD0"><block type="variables_name_get" id="#AxU5=lG7:NwyDRj$eUC"><field name="VAR" id="23Z-6/;-X7HD19^Xu;I:">CLK50M</field></block></value><value name="ADD1"><block type="variables_name_get" id="anEX+]$6MbgZ}|z-g;cp"><field name="VAR" id="p{VkT!3NS}|r+0kqUljL">rstIn</field></block></value></block></value><next><block type="variable_declaration_block" id=")_BbM@*X~;/xLf^b1NLD"><field name="variable_in_out_type">IN</field><field name="variable_type">BYTE</field><value name="variable_in_out"><block type="variables_name_get" id="0AJ8K@dD.G3f$}d6\`2?B"><field name="VAR" id="4Bez?PrUbGS\`?9M*W\`j%">swi</field></block></value><next><block type="variable_declaration_block" id="!69l|YeL8b=C~=+jh*qy"><field name="variable_in_out_type">OUT</field><field name="variable_type">BYTE</field><value name="variable_in_out"><block type="variables_name_get" id="ol?k1H7*(08?Cq8uhjOj"><field name="VAR" id="2dCC:GHgeGc#UV;uybcT">leds</field></block></value></block></next></block></next></block></statement><statement name="module_declaration_input"><block type="variable_declaration_block_5" id="197nwA$uH[6#SDc4_Wz;"><field name="variable_in_out_type">REG</field><value name="variable_in_out"><block type="brackets_block" id="@0!7RQPyuv=$6T@2i35o"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="variables_name_get" id="hNOq[P8EX9P(_*A_i)#u"><field name="VAR" id="23Z-6/;-X7HD19^Xu;I:">CLK50M</field></block></value></block></value><next><block type="variable_declaration_block_3" id="2aY=$b)!sU4oQ|)6Ovv~"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="TPsD#4o@P}P;Vb3{}U1Z"><field name="VAR" id="f[6;xl0wa=%T|~bbi\`{s">rst</field></block></value><next><block type="comment_block" id="|KHxgi{$XYcfnx!Hj5TA"><field name="comment">milliseconds</field><next><block type="variable_declaration_block_2" id="X\`=6yiLzhpQXagY\`FZ=5"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="h+p3Ett]vp:!,K?Z{t5H"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="+KE{Kb-1qX^^%80$^p4l"><field name="text_help">[16]</field></block></value><next><block type="comment_block" id="kSSw~5!!9AnK#M9FH~Sb"><field name="comment">halfseconds</field><next><block type="variable_declaration_block_2" id="@qftu#E;+VdBhgP]GfSt"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="#ujCwFH8X52n:cW0FAV}"><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="je%Dy|e@HiA.Q_X2;\`sn"><field name="text_help">[10]</field></block></value><next><block type="variable_declaration_block_2" id="$r5l4JJL):@t_auvIMx\`"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="Z5Z2[*+dJ81iAbSTV@@B"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="ehsHqB-ILb%I\`}Vw*J%g"><field name="text_help">[8]</field></block></value><next><block type="variable_declaration_block" id="MSY=!41C2OV[Fp-h:=_)"><field name="variable_in_out_type">VAR</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="lists_create_with" id="H7cOa{OL.B_.8b}j6*-W"><mutation items="2"/><value name="ADD0"><block type="variables_name_get" id="Z\`.Hg#I[:A+z)%_bXPyE"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value><value name="ADD1"><block type="variables_name_get" id="Lo-:Z7SAGvp03[2qe!2K"><field name="VAR" id="S6a7AYYIDXi$a[Pa$=??">tick1</field></block></value></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement><statement name="module_statements_input"><block type="variables_set" id="/8g[6L3yZuU]|N+.I]#G"><field name="VAR" id="2dCC:GHgeGc#UV;uybcT">leds</field><value name="VALUE"><block type="if_statement" id="J~NJ*I}JX9G/18|t=GV," inline="true"><value name="if_value"><block type="two_variables_dot" id="vkkg!DKp3bcjL:]Lj^fj"><value name="var1"><block type="variables_name_get" id="|rz~fKx1:vbKl+u0R5Bu"><field name="VAR" id="4Bez?PrUbGS\`?9M*W\`j%">swi</field></block></value><value name="var2"><block type="math_number" id="C?3_b,yfCvI7}.;dc\`:F"><field name="NUM">7</field></block></value></block></value><value name="then_value"><block type="variables_name_get" id="PJ3|dA)k-Gs;cUx^-/rr"><field name="VAR" id="4Bez?PrUbGS\`?9M*W\`j%">swi</field></block></value><value name="else_value"><block type="variables_name_get" id="$E_H#q=gP;i,aj(nlH2r"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field></block></value></block></value><next><block type="variables_set" id="jVe$PG/f4s(3vwXjsP$f"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field><value name="VALUE"><block type="brackets_block" id="Q$KHn}3{=@#qr~V+O]Zs"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="lXBJf[XD=w1d32V[,DJ}"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="|%RcY|knb@B4Hk8#tNBP"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field></block></value><value name="B"><block type="math_number" id="*I#lzS4Qz,+8m}SfDdyy"><field name="NUM">24999</field></block></value></block></value></block></value><next><block type="variables_set" id="wDOMG\`0%JWL=;/Kap[v0"><field name="VAR" id="S6a7AYYIDXi$a[Pa$=??">tick1</field><value name="VALUE"><block type="math_arithmetic" id="^?o?Eb[_7eO|vyc!DNB7"><field name="OP">STATEMENT1</field><value name="A"><block type="variables_name_get" id="q5b?+W#$]COc}w~@BJDW"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value><value name="B"><block type="brackets_block" id="#1t[\`bAxkUmE:2h_.Jgv"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="]6i6k%(,sI_H[-]UF}_t"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="\`ao,sax9BGU$XN[y2ut^"><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field></block></value><value name="B"><block type="math_number" id="w/j3%E@3G+?,o,_m:K1;"><field name="NUM">499</field></block></value></block></value></block></value></block></value><next><block type="variables_set" id="bn\`{yEJH-hj:j/:^!^!A"><field name="VAR" id="f[6;xl0wa=%T|~bbi\`{s">rst</field><value name="VALUE"><block type="negative_variable" id="4oKL\`9M1E~qGq!(ZF|,."><value name="variable_name"><block type="variables_name_get" id="/k#~y?5HvLn;^.;])z|8"><field name="VAR" id="p{VkT!3NS}|r+0kqUljL">rstIn</field></block></value></block></value><next><block type="variables_set" id="I)h,#w=E9e3R_=?QdK*Z"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field><value name="VALUE"><block type="if_statement" id="(oElBC(KO;+j4wqAL3X0" inline="true"><value name="if_value"><block type="text_helper_variable" id="8LD|^OajZGa-7*VR3Zl%"><field name="text_help">~rst</field></block></value><value name="then_value"><block type="math_number" id="I0C_#Snb#ut=zy}YhmCb"><field name="NUM">0</field></block></value><value name="else_value"><block type="if_statement" id="AWwv#kpm?)@!G6s=,Dh)" inline="true"><value name="if_value"><block type="variables_name_get" id="Ceg){{#eiRrtOR(?0SNX"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value><value name="then_value"><block type="math_number" id="5zGq(~H;2yvdVSNrES@U"><field name="NUM">0</field></block></value><value name="else_value"><block type="math_arithmetic" id="Jh.QNd!,\`9J/!@$]t3BD"><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id="Vpe#B$!Hg]I65()B#n:j"><field name="VAR" id=";(K=Bvidac(/(P)NY)e1">cnt0</field></block></value><value name="B"><block type="math_number" id="7^2UUS4TX%Aa_EckzbGH"><field name="NUM">1</field></block></value></block></value></block></value></block></value><next><block type="variables_set" id="?J:8*7id#uj}o_FlA5BF"><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field><value name="VALUE"><block type="if_statement" id=".{R;XSkg*://@3U9+]cI" inline="true"><value name="if_value"><block type="text_helper_variable" id="J($NxWp9%KWC+;zGS5d+"><field name="text_help">~rst</field></block></value><value name="then_value"><block type="math_number" id="1M)Ma_7VNcAh^tmcLas|"><field name="NUM">0</field></block></value><value name="else_value"><block type="if_statement" id="XR{qEYoC\`ZdX:tww3}as" inline="true"><value name="if_value"><block type="variables_name_get" id="rd?Rs@H*P$a@;y~.DhxC"><field name="VAR" id="S6a7AYYIDXi$a[Pa$=??">tick1</field></block></value><value name="then_value"><block type="math_number" id="TmbDTOQJg~\`jHTjtuvW?"><field name="NUM">0</field></block></value><value name="else_value"><block type="math_arithmetic" id="{.M?m~A2SN]DVe+0FB4_"><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id="K+-d-D:xJ(r6LLpbm[g."><field name="VAR" id="oMg.3u/dqon*.L(7hId%">cnt1</field></block></value><value name="B"><block type="variables_name_get" id="P?N%l_yn@RM;5m6-q\`eA"><field name="VAR" id="9w!a}L6:WV6XfR[3#/G)">tick0</field></block></value></block></value></block></value></block></value><next><block type="variables_set" id="I0RYB7MVjZ|kd.u!)AFG"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field><value name="VALUE"><block type="if_statement" id="Z6?!kl^zBb6hjf7_UC0(" inline="true"><value name="if_value"><block type="text_helper_variable" id="_+/04s1J@@{okD2CQlin"><field name="text_help">~rst</field></block></value><value name="then_value"><block type="math_number" id="GSt!hI^%O_eE1m=gvlF1"><field name="NUM">0</field></block></value><value name="else_value"><block type="math_arithmetic" id="|@mKF^)dNTBdj=5OvL:["><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id=";6wEl|p-|,eK8n6SG^%M"><field name="VAR" id="[][z;)*2y(Nf*a:g_,JY">cnt2</field></block></value><value name="B"><block type="variables_name_get" id="Li?9)pWb8V^!~]pu[ZFc"><field name="VAR" id="S6a7AYYIDXi$a[Pa$=??">tick1</field></block></value></block></value></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`
    sendXmlToWorkspace(counterXml, false, "counter.xml")
}

export function riscExample() {
    toastInfo("RISC5 example is not implemented yet")
}

export function leftShifterExample() {
    const leftShifterXml = `<?xml version="1.0"?><xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="1d[C}(~($!0~DE\`T?-kg">sc0</variable><variable id="[}OtT\`3FPRJXz06kV[\`W">x</variable><variable id="Q:y3$BWx?-OuC3^W!HcR">sc1</variable><variable id="5j(|V,l@9ECIFMzkw2{}">sc</variable><variable id="9$=lDX?op?ipZ(R7XE^i">t1</variable><variable id="FMKQqe?GDrT]U|ejp5FW">y</variable><variable id="McPDZZIlxDPlz22ats}J">t2</variable></variables><block type="module_block_module_begin" id="}3idX^e,h!OEN-QDgDRO" x="163" y="38"><field name="moduleName">LeftShifter</field><statement name="module_parameters_input"><block type="variable_declaration_block" id=";X.g\`oeNmp\`(xfb]f.2r"><field name="variable_in_out_type">IN</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id=";aZI1UMTHZTK[e^e(?s#"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value><next><block type="variable_declaration_block_2" id="fH6ebGla1|%3I8?GTz9."><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="MdYuE7\`t{O58O)l]Vi9C"><field name="VAR" id="5j(|V,l@9ECIFMzkw2{}">sc</field></block></value><value name="variable_in_out"><block type="brackets_block" id="VU6:uvkR9[^O-];GdRv+"><field name="bracketsLeft">squaredLeft</field><field name="bracketsRight">squaredRight</field><value name="variableInside"><block type="math_number" id="-.?9Q9DT3~Q/BVljeBT}"><field name="NUM">5</field></block></value></block></value><next><block type="variable_declaration_block" id="te|2[X^jwEJ3rSXckcTM"><field name="variable_in_out_type">OUT</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id="L^dRzxbhmBWrJRABkIJJ"><field name="VAR" id="FMKQqe?GDrT]U|ejp5FW">y</field></block></value></block></next></block></next></block></statement><statement name="module_declaration_input"><block type="variable_declaration_block_4" id="|uXM9@sL=98\`SpV1E6~W"><field name="variable_in_out_type">VAR</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="variables_name_get" id="-,I/h|Ig9DgLn*L!7R(I"><field name="VAR" id="1d[C}(~($!0~DE\`T?-kg">sc0</field></block></value><value name="bit_variable"><block type="math_number" id="oIQ*P1sPr@JTw}Pm#ZP2"><field name="NUM">2</field></block></value><next><block type="variable_declaration_block_4" id="gDWnXBkU]%yJM*0v6r!_"><field name="variable_in_out_type">VAR</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="variables_name_get" id="+60b1(A/c03)GK.Lx!wW"><field name="VAR" id="Q:y3$BWx?-OuC3^W!HcR">sc1</field></block></value><value name="bit_variable"><block type="math_number" id=",GL4%mmLyPGEA)xsjW7+"><field name="NUM">2</field></block></value><next><block type="variable_declaration_block_3" id="Sp~XkUCm-~_gcZua.3u?"><field name="variable_type">WORD</field><value name="variable_name"><block type="variables_name_get" id="Y)rldN;=B$[!pTezk#O!"><field name="VAR" id="9$=lDX?op?ipZ(R7XE^i">t1</field></block></value><next><block type="variable_declaration_block_3" id="UsuvF1(};*6L8BrTol4h"><field name="variable_type">WORD</field><value name="variable_name"><block type="variables_name_get" id="NPSHBww2{bowAg0(,uF{"><field name="VAR" id="McPDZZIlxDPlz22ats}J">t2</field></block></value></block></next></block></next></block></next></block></statement><statement name="module_statements_input"><block type="variables_set" id="(#mY}tm.f2*uoTZEkg67"><field name="VAR" id="1d[C}(~($!0~DE\`T?-kg">sc0</field><value name="VALUE"><block type="variable_bit_check" id=";=!TZ,Cvx%5XLv]E~VyD"><value name="var"><block type="variables_name_get" id="_B^-qB(0pWL7^0YQ!Td9"><field name="VAR" id="5j(|V,l@9ECIFMzkw2{}">sc</field></block></value><value name="bit_start"><block type="math_number" id="Zu;-tK4Kj)m28IA@+g7?"><field name="NUM">1</field></block></value><value name="bit_end"><block type="math_number" id="A!J-pQ{Fh|[SPlR1zlHf"><field name="NUM">0</field></block></value></block></value><next><block type="variables_set" id="x2ss\`k{EG=8#,t8)yT~P"><field name="VAR" id="Q:y3$BWx?-OuC3^W!HcR">sc1</field><value name="VALUE"><block type="variable_bit_check" id=",dyK4cJDl;_k)we[^fwB"><value name="var"><block type="variables_name_get" id="UuX*Oqa\`s^~d=ap#z(j1"><field name="VAR" id="5j(|V,l@9ECIFMzkw2{}">sc</field></block></value><value name="bit_start"><block type="math_number" id="C^eHW,Y.B3[QpRK4#RW["><field name="NUM">3</field></block></value><value name="bit_end"><block type="math_number" id=";dl^Vs!E+xL*rLx?W1Ie"><field name="NUM">2</field></block></value></block></value><next><block type="variables_set" id="bnW*zq)7\`XdG|^_4hAon"><field name="VAR" id="9$=lDX?op?ipZ(R7XE^i">t1</field><value name="VALUE"><block type="if_statement" id="$Hp}0(D;!6R(^=9M@,CQ"><value name="if_value"><block type="brackets_block" id="+#cA^tp#k{v4eqI=*R.1"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="h+]{!BJZpMx9Z!@H%!pH"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="8UgFSNk?|yUlprGS9MPJ"><field name="VAR" id="1d[C}(~($!0~DE\`T?-kg">sc0</field></block></value><value name="B"><block type="math_number" id="%xO@aZ!#9.y,P[Y3p\`%7"><field name="NUM">3</field></block></value></block></value></block></value><value name="then_value"><block type="brackets_block" id="5j[5K4(HR[^kd.s9ib=j"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="G8%N/o%3JwWIFuN6i^j#"><value name="var1"><block type="variable_bit_check" id=")dCPjVs1{~7Tt[k-9TXW"><value name="var"><block type="variables_name_get" id="n6*@(k)(EqP|i?tq~oVe"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value><value name="bit_start"><block type="math_number" id="A[$h^{\`-4?S6$\`vRKtGQ"><field name="NUM">28</field></block></value><value name="bit_end"><block type="math_number" id="a/u|r)m+=*M{3l)#9v~D"><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="two_variables_apostrophe" id="H#4I1+.d/^fF%#mjNgow"><value name="var1"><block type="math_number" id="\`:^r-^=Ii~?eS^qQ4=z."><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="rq4sMse*my|3~wV#VP:D"><field name="NUM">3</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="if_statement" id="]{9]=$tJo.Y_Zq#AOe~_"><value name="if_value"><block type="brackets_block" id="p_YX?tVQ\`\`YpeIc;8%/_"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="ihT|OX.Bunbm3r/z+JVm"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="k}*r[gphd6LTO|_XGtnS"><field name="VAR" id="1d[C}(~($!0~DE\`T?-kg">sc0</field></block></value><value name="B"><block type="math_number" id="h/NzeU9kEHy51!mwUza@"><field name="NUM">2</field></block></value></block></value></block></value><value name="then_value"><block type="brackets_block" id="BipUY6w7W/5L^$[\`biI3"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="-8|=Q{T;Wzk|%UqqMul^"><value name="var1"><block type="variable_bit_check" id="ZEo+]-P/pnMOt$lgC5[M"><value name="var"><block type="variables_name_get" id="{l7Mwb6i/8mPNXrWh/nz"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value><value name="bit_start"><block type="math_number" id="\`u.P1dpuS8AfwC[zm[ks"><field name="NUM">29</field></block></value><value name="bit_end"><block type="math_number" id="mZ[/9a4/+$MDbt}xmmM,"><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="two_variables_apostrophe" id="}5(qyg=c]-)\`xoKcOt3+"><value name="var1"><block type="math_number" id="L.H/pigE\`Cp8(T]yCtDj"><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="0}uzuwTBgGAhy%K/XO^A"><field name="NUM">2</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="if_statement" id="LzXIZRij=x~|YNd-fCY$"><value name="if_value"><block type="brackets_block" id="MT)yZ:J3/q^qznZ-1BY7"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="%TaHo3E[btd-ZDe^+s}N"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="8@ar!bloH#2@^{yJFh;C"><field name="VAR" id="1d[C}(~($!0~DE\`T?-kg">sc0</field></block></value><value name="B"><block type="math_number" id="(ko%.k\`waYi8uR({bfR)"><field name="NUM">1</field></block></value></block></value></block></value><value name="then_value"><block type="brackets_block" id="s:~HIc@u~Y3=tdJ34y2E"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="zGzXn7^T1KgRDJ({1X)a"><value name="var1"><block type="variable_bit_check" id="s|NIPT$s#Umcso(v/tjg"><value name="var"><block type="variables_name_get" id="rbY[PsoEpmNx$6FCJU_i"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value><value name="bit_start"><block type="math_number" id="b67j:Npl%gH2pkLsxLLV"><field name="NUM">30</field></block></value><value name="bit_end"><block type="math_number" id="!O7{Ge#\`eiV@P{VNuQ(("><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="two_variables_apostrophe" id="2VAevDRDj)GUBz\`r4l)O"><value name="var1"><block type="math_number" id="Ms_9*rvDaH/BBGlBFBku"><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="8T4j[rqqiuXPc)7HdS)x"><field name="NUM">1</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="variables_name_get" id="k5H*+lonUE_;4xD@?/~7"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value></block></value></block></value></block></value><next><block type="variables_set" id=")]J%Go:|s-*u}wHo4]Ks"><field name="VAR" id="McPDZZIlxDPlz22ats}J">t2</field><value name="VALUE"><block type="if_statement" id="),Yy?YJsuQ_RwErr6G[e"><value name="if_value"><block type="brackets_block" id="Pwm3]7kSa^\`)9Xss/FiD"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="G;5H7ZDqteewuiE!%!K7"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="+s?)XC,._OaQFSB=Uec-"><field name="VAR" id="Q:y3$BWx?-OuC3^W!HcR">sc1</field></block></value><value name="B"><block type="math_number" id="{QYsvmOlxmPT\`F;t*J]p"><field name="NUM">3</field></block></value></block></value></block></value><value name="then_value"><block type="brackets_block" id="JD-k9mb-iGuT[y:fjgL2"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="}!9LrMlB-NT,ieOfdpuu"><value name="var1"><block type="variable_bit_check" id="@cwSAdZwadx*qAarG\`Lu"><value name="var"><block type="variables_name_get" id=".8z?}INreu~oBoq\`9W-J"><field name="VAR" id="9$=lDX?op?ipZ(R7XE^i">t1</field></block></value><value name="bit_start"><block type="math_number" id="QpNlSXm8RV%.y*}+AaA7"><field name="NUM">19</field></block></value><value name="bit_end"><block type="math_number" id="]eK1w|sRq9om43NLqjri"><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="two_variables_apostrophe" id="yWzMpX%qS|ac];!9W@5v"><value name="var1"><block type="math_number" id="Km.E+o{r[/)bY#F6TbX8"><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="LN;XvSd%ws:GZ+a-GjW1"><field name="NUM">12</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="if_statement" id="-3$v[rGgh}Aw\`|\`fDXru"><value name="if_value"><block type="brackets_block" id="zU*Cn(wP[\`Ug1//aW(V:"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="uFp=;F]q!aBUIhTJk"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="j~K,H7bca,hSYsm+[(uD"><field name="VAR" id="Q:y3$BWx?-OuC3^W!HcR">sc1</field></block></value><value name="B"><block type="math_number" id="b-s2@%kv+.=fZg(|ZgGv"><field name="NUM">2</field></block></value></block></value></block></value><value name="then_value"><block type="brackets_block" id="!Fvf+S@Tj}^0)UzV_y_%"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="jKXxrCempZTD]~#qb%ng"><value name="var1"><block type="variable_bit_check" id="XT(JU%][k9.F2w8NEg0J"><value name="var"><block type="variables_name_get" id="s%6Q}/GtMcarS6#IR[kj"><field name="VAR" id="9$=lDX?op?ipZ(R7XE^i">t1</field></block></value><value name="bit_start"><block type="math_number" id="9kGHC?bpSBARs~g!?o68"><field name="NUM">23</field></block></value><value name="bit_end"><block type="math_number" id="tQv1S@aS!/YY1?OKbET5"><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="two_variables_apostrophe" id="d8R~Z!?EkA5a}Ef.WzEG"><value name="var1"><block type="math_number" id="iWFHhV1SZT^^_lHFLU:X"><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="21t;583@/ou:Qe*vc%[P"><field name="NUM">8</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="if_statement" id="*Dli/Y8~uh=#UMkVDT,g"><value name="if_value"><block type="brackets_block" id="+um:)9~EZQTCa+%rhqAg"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="TINm1ow^Wsk/@{y)R:0A"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="kx_80kO!Y_KPl((#zZ!="><field name="VAR" id="Q:y3$BWx?-OuC3^W!HcR">sc1</field></block></value><value name="B"><block type="math_number" id="2e685)~=Pj_+!G2r|5Cu"><field name="NUM">1</field></block></value></block></value></block></value><value name="then_value"><block type="brackets_block" id="%]8n^vHTcl-::)6TWdu:"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="N*dq$O$J}%WQX%]C,(Hx"><value name="var1"><block type="variable_bit_check" id="r^.I)g.eP:1+#V9n]fhb"><value name="var"><block type="variables_name_get" id="p.QINiW6k_Ol++stX/=*"><field name="VAR" id="9$=lDX?op?ipZ(R7XE^i">t1</field></block></value><value name="bit_start"><block type="math_number" id="k{@WW|XZHO.,#kz^+GW!"><field name="NUM">27</field></block></value><value name="bit_end"><block type="math_number" id="/\`xyT#lcIRpA-.6JB5c0"><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="two_variables_apostrophe" id="O}?I=;pT^9+.sQR)Q?Oc"><value name="var1"><block type="math_number" id="k4cSW=UPBA$X(MRX?RU4"><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="59CT\`9pT]A5?_!}6@uu]"><field name="NUM">4</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="variables_name_get" id="F$2UwAs3O_]0S=jQBv,Y"><field name="VAR" id="9$=lDX?op?ipZ(R7XE^i">t1</field></block></value></block></value></block></value></block></value><next><block type="variables_set" id="sFR}gr\`3e?I*dD/cIWfr"><field name="VAR" id="FMKQqe?GDrT]U|ejp5FW">y</field><value name="VALUE"><block type="if_statement" id="1:1*?4q29oFzNMI!02{%" inline="true"><value name="if_value"><block type="text_helper_variable" id="[}iX{y4p}Qg#0e-:7hhl"><field name="text_help">sc.4</field></block></value><value name="then_value"><block type="brackets_block" id="CyHsrZ7Vb;RDfw-Ti6hL"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="~i=Na]V)+v/#6Ehxc*F1"><value name="var1"><block type="variable_bit_check" id="YQ%sSeZ^sWl[yC!R#McV"><value name="var"><block type="variables_name_get" id="|+]0a{Bj$ok+v3WGJVh|"><field name="VAR" id="McPDZZIlxDPlz22ats}J">t2</field></block></value><value name="bit_start"><block type="math_number" id="]j.]ejorTOP[(LPGq+%7"><field name="NUM">15</field></block></value><value name="bit_end"><block type="math_number" id="xv(d^R$p#PVNqbA02@{d"><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="two_variables_apostrophe" id="]eCGa,a^9~{fiR#0W3!R"><value name="var1"><block type="math_number" id="k$xDp[-]ezBJW1e|7IZ$"><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="YxmnKkuAgQlkT!CMY8z^"><field name="NUM">16</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="text_helper_variable" id="r;{U]E8TkJPnwqvMXhi["><field name="text_help">t2</field></block></value></block></value></block></next></block></next></block></next></block></next></block></statement></block></xml>`
    sendXmlToWorkspace(leftShifterXml, false, "leftShifter.xml")
}

export function rightShifterExample() {
    toastInfo("Right Shifter example is not implemented yet")
}

export function multiplierExample() {
    const multiplierXml = `<?xml version="1.0"?><xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="+T!Fp4L%0-zC,}qqNiJ1">stall</variable><variable id="aEAkGv5ypVrf)4r/|8pW">w0</variable><variable id="Er?FJ1n^??8kk*nW0mZo">clk</variable><variable id="2VtR;;@2LqmzIJ([KMh%">run</variable><variable id="}pe0fK|C{_raoHngVN_N">u</variable><variable id="|2,yIGcN{$4Rl}sC#QVs">w1</variable><variable id="(4N02orxBE#u}Q[hssx6">S</variable><variable id="HUsTxWU1$f_sO:8*m:gM">y</variable><variable id="BIHk20w+u5tPnobX/e9=">P</variable><variable id="-9nT5@5Slh4zRLxCeF5\`">x</variable><variable id="qtSQh}/)?|c{Fe58P+f]">z</variable></variables><block type="module_block_module_begin" id="stGo}VRjQPGVM!3HxM6[" x="-887" y="38"><field name="moduleName">Multiplier</field><statement name="module_parameters_input"><block type="variable_declaration_block" id="j}^(0VR]]mZl2frMo~iy"><field name="variable_in_out_type">IN</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="lists_create_with" id="!)t1la~z+CRV%t\`]T;Vz"><mutation items="3"/><value name="ADD0"><block type="variables_name_get" id="F7#fa}(~P3|^!]lJlNZ+"><field name="VAR" id="Er?FJ1n^??8kk*nW0mZo">clk</field></block></value><value name="ADD1"><block type="variables_name_get" id="BkmK3V6g3P,z]m)|Wh,1"><field name="VAR" id="2VtR;;@2LqmzIJ([KMh%">run</field></block></value><value name="ADD2"><block type="variables_name_get" id=",,Id78myF+QX??u4Rxfr"><field name="VAR" id="}pe0fK|C{_raoHngVN_N">u</field></block></value></block></value><next><block type="variable_declaration_block" id="8~[hVd9dMN)rF$.G^Co)"><field name="variable_in_out_type">OUT</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="variables_name_get" id="~zBMEw)ls.Or03U*j5[-"><field name="VAR" id="+T!Fp4L%0-zC,}qqNiJ1">stall</field></block></value><next><block type="variable_declaration_block" id="6!K;w,5Ha,/feHqG~DE{"><field name="variable_in_out_type">IN</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="lists_create_with" id="v%Z,v9M)Q2rDo4juYp5~"><mutation items="2"/><value name="ADD0"><block type="variables_name_get" id="jaRDSV)iC\`R8+,7,~;X;"><field name="VAR" id="-9nT5@5Slh4zRLxCeF5\`">x</field></block></value><value name="ADD1"><block type="variables_name_get" id="V0x+o5AXgO\`{w;y+SkSn"><field name="VAR" id="HUsTxWU1$f_sO:8*m:gM">y</field></block></value></block></value><next><block type="variable_declaration_block_4" id=",}@vdY]5)-EAp^2=)X4\`"><field name="variable_in_out_type">OUT</field><field name="variable_type">BIT</field><value name="variable_in_out"><block type="variables_name_get" id="Wm7vN,/ix,o=tqtCjvnv"><field name="VAR" id="qtSQh}/)?|c{Fe58P+f]">z</field></block></value><value name="bit_variable"><block type="math_number" id="IQm\`e(r0(@i_h.9|HEk,"><field name="NUM">64</field></block></value></block></next></block></next></block></next></block></statement><statement name="module_declaration_input"><block type="variable_declaration_block_5" id="Wh]\`o;9,l[N_4?Z/kW{^"><field name="variable_in_out_type">REG</field><value name="variable_in_out"><block type="brackets_block" id="5xV42FGuaZ_m{]OIyHmT"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="variables_name_get" id="TgeZd-zM~JTXtSNblYkD"><field name="VAR" id="Er?FJ1n^??8kk*nW0mZo">clk</field></block></value></block></value><next><block type="variable_declaration_block_2" id="O{fGYz.v=dQmG*Xx.AcZ"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="w~A:~j::5V8H3f/l#1=="><field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="rY#(:kHfa8j1NMJy;Pnr"><field name="text_help">[6]</field></block></value><next><block type="variable_declaration_block_2" id="2mMU7+]*YX[}E?/c?^J}"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="nGAB*kfDSVmyrLSYsni1"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="1OQizW1d/nXJImPi?0nV"><field name="text_help">[64]</field></block></value><next><block type="variable_declaration_block" id="eh{6St:Z%=MNT;_pH3k2"><field name="variable_in_out_type">VAR</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id="}_89wI\`M$8tMb$/wWO)!"><field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field></block></value><next><block type="variable_declaration_block_2" id="%;Y4t]-A,]LdRP?lPjD-"><field name="variable_type">BIT</field><value name="variable_name"><block type="variables_name_get" id="9n@NR-aWvkTW/xXvjdoQ"><field name="VAR" id="|2,yIGcN{$4Rl}sC#QVs">w1</field></block></value><value name="variable_in_out"><block type="text_helper_variable" id="4GF6}lIw!YB9v,UeDHfm"><field name="text_help">[33]</field></block></value></block></next></block></next></block></next></block></next></block></statement><statement name="module_statements_input"><block type="variables_set" id="WYyzwVRWaB8uP:ce5W^D"><field name="VAR" id="+T!Fp4L%0-zC,}qqNiJ1">stall</field><value name="VALUE"><block type="math_arithmetic" id="QEG\`Yx:nHr85-S-JZX4Y"><field name="OP">STATEMENT1</field><value name="A"><block type="variables_name_get" id="LyKPj;+l0eKehCDWu#Zx"><field name="VAR" id="2VtR;;@2LqmzIJ([KMh%">run</field></block></value><value name="B"><block type="brackets_block" id="j*^r;,;PUhg,guuffY./"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="Sh0](l14nuULqjqPeBmq"><field name="OP">STATEMENT2</field><value name="A"><block type="variables_name_get" id="N@jw?W?-%6{|:Gq\`e%OK"><field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field></block></value><value name="B"><block type="math_number" id="BLo[\`yS{V4$dH}o#PP:y"><field name="NUM">33</field></block></value></block></value></block></value></block></value><next><block type="variables_set" id="/3v1(T}Wu%suAT{GEMNS"><field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field><value name="VALUE"><block type="if_statement" id="D\`9HP=nj(liOjOs211Er" inline="true"><value name="if_value"><block type="two_variables_dot" id="!E@An!;Y?\`F3{o;wp\`l3"><value name="var1"><block type="variables_name_get" id="5t*%5Z)#0Vh\`7GXiY:/G"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value><value name="var2"><block type="math_number" id=";l0Dd~.GAn:T_Qc+WF5]"><field name="NUM">0</field></block></value></block></value><value name="then_value"><block type="variables_name_get" id="ba[eaA6Ml1%i~FLA,v8L"><field name="VAR" id="HUsTxWU1$f_sO:8*m:gM">y</field></block></value><value name="else_value"><block type="math_number" id="=VCVt!yW_5]YyAu.flA?"><field name="NUM">0</field></block></value></block></value><next><block type="variables_set" id="{X{w$cTk)0w2DV+5*a51"><field name="VAR" id="|2,yIGcN{$4Rl}sC#QVs">w1</field><value name="VALUE"><block type="if_statement" id="z==?Dg=tkA\`=]9gHT=JW"><value name="if_value"><block type="math_arithmetic" id="xR+!{C0I-DuAduCxmw|o"><field name="OP">STATEMENT1</field><value name="A"><block type="brackets_block" id="A;1]^t5Gv+)9d)mtIxZ%"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id="tAmnvZ7DZOY;FY5{KmgG"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="-sI/b-jL19=/(Ew(Od+w"><field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field></block></value><value name="B"><block type="math_number" id="u7(6DCYlm$h@@m;CK_a:"><field name="NUM">32</field></block></value></block></value></block></value><value name="B"><block type="variables_name_get" id="vqD..V-eM@qT-HvUD(Q+"><field name="VAR" id="}pe0fK|C{_raoHngVN_N">u</field></block></value></block></value><value name="then_value"><block type="math_arithmetic" id="=418J1K[%1T?A-Y-po48" inline="false"><field name="OP">MINUS</field><value name="A"><block type="brackets_block" id="8aZeM~e.#/xSi,Z#_UP7"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="SDv+K#OmN/ur)FgB+9]t"><value name="var1"><block type="two_variables_dot" id="t6wk,J_R5oZ25yKKr#*\`"><value name="var1"><block type="variables_name_get" id="8Hs^k)0~P[rIPGr^bn;L"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value><value name="var2"><block type="math_number" id="X0mUVToJF$U#_3fpt~1("><field name="NUM">63</field></block></value></block></value><value name="var2"><block type="variable_bit_check" id="~\`{vF=Zk~xd~Y-/1}SiD"><value name="var"><block type="variables_name_get" id="j?H|a-1kG%~Y_w^v+P;K"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value><value name="bit_start"><block type="math_number" id="xe9fQ3PC=T_tWVtlP]s2"><field name="NUM">63</field></block></value><value name="bit_end"><block type="math_number" id="[Hr%!ThlI8\`SWEFHSFaH"><field name="NUM">32</field></block></value></block></value></block></value></block></value><value name="B"><block type="brackets_block" id="8CY|-zHVb:|vf,Atd/\`C"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="/~i+({s3K;Q$5!~2#rUY"><value name="var1"><block type="two_variables_dot" id="jcY[^5Xxls9}o1Y~wt},"><value name="var1"><block type="variables_name_get" id="2HTg)%g#ss#UKBZBFqi)"><field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field></block></value><value name="var2"><block type="math_number" id=".hK-udFhbWrAkRq^?bY_"><field name="NUM">31</field></block></value></block></value><value name="var2"><block type="variables_name_get" id="[zHrW~|_8:kn~J%)UFr:"><field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field></block></value></block></value></block></value></block></value><value name="else_value"><block type="math_arithmetic" id="V|}M9RNf0Mg/O!TQd85f" inline="false"><field name="OP">ADD</field><value name="A"><block type="brackets_block" id=":.d$Xw[Xj+_tfv!1JgnR"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="sSE*6I,v,f9A\`WlZwM1R"><value name="var1"><block type="two_variables_dot" id="Y+K7HzJpzk9Nnwgu~Dhh"><value name="var1"><block type="variables_name_get" id="j:MQ%1S=(o97UEFST(sU"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value><value name="var2"><block type="math_number" id="DVGk!je3a/UnPn)CI%^E"><field name="NUM">63</field></block></value></block></value><value name="var2"><block type="variable_bit_check" id="#632uYCZ~o|*w=#eB_O~"><value name="var"><block type="variables_name_get" id="iz;:ot*p)k6=[;X|a.7v"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value><value name="bit_start"><block type="math_number" id="w2\`P8s_Fs::^+u:|c|7n"><field name="NUM">63</field></block></value><value name="bit_end"><block type="math_number" id="qs_e|cmMow8%}~Z60WKm"><field name="NUM">32</field></block></value></block></value></block></value></block></value><value name="B"><block type="brackets_block" id="*%)=V!31+#3[J)\`}m,hB"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="X7!RDGHgPTm%hkIC@CrZ"><value name="var1"><block type="two_variables_dot" id="+7x^efp;kSeIn0$@{ziJ"><value name="var1"><block type="variables_name_get" id=",8Z?e/Y=~J;X\`tvq|R\`$"><field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field></block></value><value name="var2"><block type="math_number" id="!s-qC^@$^vvED|$j8;!6"><field name="NUM">31</field></block></value></block></value><value name="var2"><block type="variables_name_get" id="K@3padEEbLBcUU)$2K@5"><field name="VAR" id="aEAkGv5ypVrf)4r/|8pW">w0</field></block></value></block></value></block></value></block></value></block></value><next><block type="variables_set" id=":_--73CEInJ_*2L[Rmbk"><field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field><value name="VALUE"><block type="if_statement" id=",h4(p~O,4hJ4n\`V0i{S[" inline="true"><value name="if_value"><block type="variables_name_get" id="WcBtiP6X~NE:=6:u.d-T"><field name="VAR" id="2VtR;;@2LqmzIJ([KMh%">run</field></block></value><value name="then_value"><block type="math_arithmetic" id="y@:th4xTX,UezYnO4qV#"><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id="yu,KAa,JHnQ6dM//;^|U"><field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field></block></value><value name="B"><block type="math_number" id="IMI_u[O]1}LU4Z=Ra2!/"><field name="NUM">1</field></block></value></block></value><value name="else_value"><block type="math_number" id="$t6XyKBpD$/u9\`sh{_1e"><field name="NUM">0</field></block></value></block></value><next><block type="variables_set" id="h8v2_qy?+zC*z#f6H:[e"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field><value name="VALUE"><block type="if_statement" id="_^CrP\`-ObSDZl4+;G{u/" inline="true"><value name="if_value"><block type="brackets_block" id="TDnW07:?;gJw4$JjrjD-"><field name="bracketsLeft">normalLeft</field><field name="bracketsRight">normalRight</field><value name="variableInside"><block type="math_arithmetic" id=";)/Kw*9WBfYbfnj8lQcj"><field name="OP">STATEMENT4</field><value name="A"><block type="variables_name_get" id="b/lS(tn4):tXNfx(dnrb"><field name="VAR" id="(4N02orxBE#u}Q[hssx6">S</field></block></value><value name="B"><block type="math_number" id="kkK8#VK_ju_}x4@po.Lo"><field name="NUM">0</field></block></value></block></value></block></value><value name="then_value"><block type="brackets_block" id="hjb:JRV^h\`L.L:~RmZ*t"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="#*JhXPUUh}6C$_))-I7p"><value name="var1"><block type="two_variables_apostrophe" id="LGd|;*Fp}TW60rHA%!Cs"><value name="var1"><block type="math_number" id="$Lm.EcB3?[3P/Zso),qU"><field name="NUM">0</field></block></value><value name="var2"><block type="math_number" id="X;0BD,95LHQN=UMYVEUU"><field name="NUM">32</field></block></value></block></value><value name="var2"><block type="variables_name_get" id="wUCzG1xtu7*w3yIK6|ti"><field name="VAR" id="-9nT5@5Slh4zRLxCeF5\`">x</field></block></value></block></value></block></value><value name="else_value"><block type="brackets_block" id="3H?~qoVYV9!]EK6/5n.}"><field name="bracketsLeft">curlyLeft</field><field name="bracketsRight">curlyRight</field><value name="variableInside"><block type="two_variables_comma" id="eBVocP/xq$*}F=2Bh7Q4"><value name="var1"><block type="variable_bit_check" id="DBeZ4!orLub6g6S4QrUv"><value name="var"><block type="variables_name_get" id="Ar*Lx(_|5|0I8x6dxex)"><field name="VAR" id="|2,yIGcN{$4Rl}sC#QVs">w1</field></block></value><value name="bit_start"><block type="math_number" id="P}xaVv]:mu_SxfIav?!H"><field name="NUM">32</field></block></value><value name="bit_end"><block type="math_number" id="Jpv@c-IS$DQX?beYB9uU"><field name="NUM">0</field></block></value></block></value><value name="var2"><block type="variable_bit_check" id="M\`+T2!KmOC1dZ4MY^dn;"><value name="var"><block type="variables_name_get" id="s?-|RcI^K^v%\`fi[$vTT"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value><value name="bit_start"><block type="math_number" id="L$?4-{;pb$xTItaFUI/R"><field name="NUM">31</field></block></value><value name="bit_end"><block type="math_number" id="vO.nC_le(])d4=TUr$$s"><field name="NUM">1</field></block></value></block></value></block></value></block></value></block></value><next><block type="variables_set" id=":H]nMmGIKQQz{Px|T=Oj"><field name="VAR" id="qtSQh}/)?|c{Fe58P+f]">z</field><value name="VALUE"><block type="variables_name_get" id=",CYCosdbcbwq0Vc9lb5S"><field name="VAR" id="BIHk20w+u5tPnobX/e9=">P</field></block></value></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`
    sendXmlToWorkspace(multiplierXml, false, "multiplier.xml")
}

export function dividerExample() {
    toastInfo("Divider example is not implemented yet")
}

export function fpaAdderExample() {
    toastInfo("fpaAdder is not implemented yet")
}

export function fpMultiplierExample() {
    toastInfo("fpMultiplier is not implemented yet")
}

export function fpDividerExample() {
    toastInfo("fpDivider is not implemented yet")
}

export function adderBasic() {
    const adderBasicXml = `<?xml version="1.0"?><xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="XC{=dhDs;A!7qyb4=n,/">c</variable><variable id="[}OtT\`3FPRJXz06kV[\`W">x</variable><variable id="FMKQqe?GDrT]U|ejp5FW">y</variable></variables><block type="module_block_module_begin" id="%CSH(GXS_lW:smRGIqLs" x="38" y="63"><field name="moduleName">Adder</field><statement name="module_parameters_input"><block type="variable_declaration_block" id="$bm}qKfRYYNIDEKwIdJx"><field name="variable_in_out_type">IN</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id="-UxOC?z3sGNP/0CjamAi"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value><next><block type="variable_declaration_block" id="[U1$[qYgIlG}N)Iw8bT%"><field name="variable_in_out_type">IN</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id="+c2\`rDi*JVBP?41-N4X}"><field name="VAR" id="FMKQqe?GDrT]U|ejp5FW">y</field></block></value><next><block type="variable_declaration_block" id="t#NN9Stp,NI8s_{x|*9K"><field name="variable_in_out_type">OUT</field><field name="variable_type">WORD</field><value name="variable_in_out"><block type="variables_name_get" id="Dccw)F{WISX/KN)CnQ!-"><field name="VAR" id="XC{=dhDs;A!7qyb4=n,/">c</field></block></value></block></next></block></next></block></statement><statement name="module_statements_input"><block type="variables_set" id="3zT7:z1C0dO[+LoV_2JW"><field name="VAR" id="XC{=dhDs;A!7qyb4=n,/">c</field><value name="VALUE"><block type="math_arithmetic" id="$2hi0bJ|a/6E)o[1/q5r"><field name="OP">ADD</field><value name="A"><block type="variables_name_get" id="D7Xz6Rt%VUP,[^cM[lt8"><field name="VAR" id="[}OtT\`3FPRJXz06kV[\`W">x</field></block></value><value name="B"><block type="variables_name_get" id="\`|]i,dxjq3]Oj%qZ.EkA"><field name="VAR" id="FMKQqe?GDrT]U|ejp5FW">y</field></block></value></block></value></block></statement></block></xml>`
    sendXmlToWorkspace(adderBasicXml, false, "Adder.xml")
}

export function adderTestbench() {
    const testbenchExample = `\`timescale 1ns / 1ps
    module testbench;
    reg [31:0] x;
    reg [31:0] y;
    wire [31:0] c;

    Adder DUT (
        .x(x),
	    .y(y),
		    .c(c)
    );

	initial begin
	    x = 2;
	    y = 3;
	    #5; // delay for 5 time units
	    $display("x = %d", x);
	    $display("y = %d", y);
	    $display("c = %d", c);
	    $display("Expected result = %d", x+y);
	    
	    if (c != x+y) begin
	        $display("Test failed");
	    end else begin
	            $display("Test passed");
		        end
			end
			endmodule`
    save("example_adder_tb.v", testbenchExample);
}


export function aluExample() {
    const aluXml = `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</variable>
    <variable id="*@%~6PzRg5xtJCKH3QK@">k</variable>
    <variable id="%leq=9Q#1$x0U!rgkY/;">z</variable>
    <variable id="H(=q|NUaid08?N|\`El7*">x</variable>
    <variable id="*e\`)H~3|q_m{N,g_{p2M">ZF</variable>
    <variable id="E2raHhq)/La4hiUIxT:7">y</variable>
    <variable id="ag(idP9Z-HRf9l1\`kRB5">BAF</variable>
    <variable id="Z3w.[6:~~b@ayYODazRN">op</variable>
    <variable id="@L*+Q*u7m}!edn%YUB|#">IOF</variable>
  </variables>
  <block type="module_block_module_begin" id="/A*awNmnm*U]=7)Sp4n-" x="-962" y="188">
    <field name="moduleName">ALU</field>
    <statement name="module_parameters_input">
      <block type="comment_block" id="|%u_t)$Ha[@6fri}]ys8">
        <field name="comment">x, y, z, zNoRing registers</field>
        <next>
          <block type="variable_declaration_block_4" id="Mq]~tj(Hk.rIG!s%AxRX">
            <field name="variable_in_out_type">IN</field>
            <field name="variable_type">BIT</field>
            <value name="variable_in_out">
              <block type="variables_name_get" id="zC2^sVV+?zrFA.Y^--Zr">
                <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
              </block>
            </value>
            <value name="bit_variable">
              <block type="math_number" id="8swM~L{L/^SGzebp2nkh">
                <field name="NUM">6</field>
              </block>
            </value>
            <next>
              <block type="variable_declaration_block_4" id="cCde}BN(kdfX-?6V{6gN">
                <field name="variable_in_out_type">IN</field>
                <field name="variable_type">BIT</field>
                <value name="variable_in_out">
                  <block type="variables_name_get" id="2VE!P06[R.VJtw=B4^d4">
                    <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                  </block>
                </value>
                <value name="bit_variable">
                  <block type="math_number" id="5EQ;cgv:i/QKu(!buLt;">
                    <field name="NUM">6</field>
                  </block>
                </value>
                <next>
                  <block type="variable_declaration_block_4" id="c;ff|)(8}sW::*8.tc6#">
                    <field name="variable_in_out_type">OUT</field>
                    <field name="variable_type">BIT</field>
                    <value name="variable_in_out">
                      <block type="variables_name_get" id="v%9}.$2|a|JYATc{=Kx\`">
                        <field name="VAR" id="%leq=9Q#1$x0U!rgkY/;">z</field>
                      </block>
                    </value>
                    <value name="bit_variable">
                      <block type="math_number" id="kb0yCI(f0$9?r)43l;9-">
                        <field name="NUM">6</field>
                      </block>
                    </value>
                    <next>
                      <block type="variable_declaration_block_4" id="kV_7VLCs;BEL4w]c5IrB">
                        <field name="variable_in_out_type">OUT</field>
                        <field name="variable_type">BIT</field>
                        <value name="variable_in_out">
                          <block type="variables_name_get" id="}/V=+Gq+KUcr!0lELbX}">
                            <field name="VAR" id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</field>
                          </block>
                        </value>
                        <value name="bit_variable">
                          <block type="math_number" id=",56!0jFh=TAz/aBR\`Zl7">
                            <field name="NUM">6</field>
                          </block>
                        </value>
                        <next>
                          <block type="comment_block" id="\`UMpX~aQ5EskO{c*epU.">
                            <field name="comment">operation code</field>
                            <next>
                              <block type="variable_declaration_block_4" id="rQIZieI13lWSBm5u_iOK">
                                <field name="variable_in_out_type">IN</field>
                                <field name="variable_type">BIT</field>
                                <value name="variable_in_out">
                                  <block type="variables_name_get" id="pTTpj|9JVRbL#UocAt@7">
                                    <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                  </block>
                                </value>
                                <value name="bit_variable">
                                  <block type="math_number" id="D2;E]1C;j,3IK/6Y/K]p">
                                    <field name="NUM">4</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="comment_block" id=".8k.ez*bQGJ4csUa@8#u">
                                    <field name="comment">flags</field>
                                    <next>
                                      <block type="variable_declaration_block_4" id=":3rw;Bn3mE_4=D[dsTPw">
                                        <field name="variable_in_out_type">OUT</field>
                                        <field name="variable_type">BIT</field>
                                        <value name="variable_in_out">
                                          <block type="variables_name_get" id=":X!EO|Fhc^6/|D9E|xoe">
                                            <field name="VAR" id="ag(idP9Z-HRf9l1\`kRB5">BAF</field>
                                          </block>
                                        </value>
                                        <value name="bit_variable">
                                          <block type="math_number" id="+c0Jl/Rv-^v=lerN359x">
                                            <field name="NUM">1</field>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="variable_declaration_block_4" id="a;BNmdcmT:,8+H4Cto{U">
                                            <field name="variable_in_out_type">OUT</field>
                                            <field name="variable_type">BIT</field>
                                            <value name="variable_in_out">
                                              <block type="variables_name_get" id="2LWJ2H=Ly=LUig-Rx6:@">
                                                <field name="VAR" id="@L*+Q*u7m}!edn%YUB|#">IOF</field>
                                              </block>
                                            </value>
                                            <value name="bit_variable">
                                              <block type="math_number" id="=(0{:!F=oTj~a9\`0CdPC">
                                                <field name="NUM">1</field>
                                              </block>
                                            </value>
                                            <next>
                                              <block type="variable_declaration_block_4" id="OcvNn)?IZlr3W]!BNDj%">
                                                <field name="variable_in_out_type">OUT</field>
                                                <field name="variable_type">BIT</field>
                                                <value name="variable_in_out">
                                                  <block type="variables_name_get" id="|I!V%6H_3Il@LQN^\`owJ">
                                                    <field name="VAR" id="*e\`)H~3|q_m{N,g_{p2M">ZF</field>
                                                  </block>
                                                </value>
                                                <value name="bit_variable">
                                                  <block type="math_number" id="C)4UsV,pJ(rf~]L#z8r-">
                                                    <field name="NUM">1</field>
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
                            </next>
                          </block>
                        </next>
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
    <statement name="module_declaration_input">
      <block type="constant_declaration_block" id="~eTK9+uc+2L2VsY~ij{Q">
        <field name="const">CONST</field>
        <field name="variable" id="*@%~6PzRg5xtJCKH3QK@">k</field>
        <value name="variable_value">
          <block type="math_number" id="8w=61oQe\`!.~-GoW3(!M">
            <field name="NUM">32</field>
          </block>
        </value>
      </block>
    </statement>
    <statement name="module_statements_input">
      <block type="variables_set" id="baErHT!bT4Wl}la)]?,!">
        <field name="VAR" id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</field>
        <value name="VALUE">
          <block type="variables_name_get" id="5C-/z#O*!MHWjaARiMZT">
            <field name="VAR" id="%leq=9Q#1$x0U!rgkY/;">z</field>
          </block>
        </value>
        <next>
          <block type="variables_set" id="LmU1E4S8dYoT2vazf6{{">
            <field name="VAR" id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</field>
            <value name="VALUE">
              <block type="if_statement" id="FNW,pglW9y(MDSp!b8(@">
                <value name="if_value">
                  <block type="two_variables_dot" id="1U7c(H\`)/lT%N1L9[gdb">
                    <value name="var1">
                      <block type="variables_name_get" id="X1/1ZyhOW@tq\`8jJrQ#z">
                        <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                      </block>
                    </value>
                    <value name="var2">
                      <block type="math_number" id="]ocdKzm/st~EQ(5X1PCP">
                        <field name="NUM">3</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="then_value">
                  <block type="if_statement" id="(mDjjt/n/Yh!0@7;:9PJ">
                    <value name="if_value">
                      <block type="two_variables_dot" id="gw.A{8F\`V+^TKY_*ipa*">
                        <value name="var1">
                          <block type="variables_name_get" id="~*SdZ5s|UbSM+nD]@hHL">
                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                          </block>
                        </value>
                        <value name="var2">
                          <block type="math_number" id="PWX8p2uC7um@#2/WL]~8">
                            <field name="NUM">2</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="then_value">
                      <block type="brackets_block" id="M,J3NOVU8C\`Qd\`IeR2[l">
                        <field name="bracketsLeft">normalLeft</field>
                        <field name="bracketsRight">normalRight</field>
                        <value name="variableInside">
                          <block type="if_statement" id="@:RIg*_4=7ZH5#H^R#54">
                            <value name="if_value">
                              <block type="two_variables_dot" id="3{@jHKm?aRi^$%{mg1ja">
                                <value name="var1">
                                  <block type="variables_name_get" id="l\`\`{LQDPgFcFJBiHWad~">
                                    <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                  </block>
                                </value>
                                <value name="var2">
                                  <block type="math_number" id="OGDeDHc0-|TJ7Jx6~HNw">
                                    <field name="NUM">1</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="then_value">
                              <block type="brackets_block" id="(e%N}Ih}u6[KSW#I16QN">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="N=z{vcHi,aM,fpPaZ$Od">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="nsj-ycMnNVas_@\`n=hVe">
                                        <value name="var1">
                                          <block type="variables_name_get" id="bGqV[=_FLNZ8c/UsC\`!m">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="8o~l?[1;x0W%2?s2M7RL">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_arithmetic" id="AJ]=nXAttlplP#%Zt0c]">
                                        <field name="OP">STATEMENT5</field>
                                        <comment pinned="false" h="54" w="94">OR command
1111
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="\`I78}}sGRVE)%2vF{umT">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="+eu_/~az:OMX(@d|@\`/H">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="math_arithmetic" id=":(j_tKkp)eDX1_z@.XDa">
                                        <field name="OP">STATEMENT1</field>
                                        <comment pinned="false" h="52" w="103">AND command
1110
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="z-eP7|^n3@y7,5!2\`_:;">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="u0_m7cVEVBT36]83dJRz">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="else_value">
                              <block type="brackets_block" id="IoWCqAy%^TNR_!Z(u#w_">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="#~u)rHXe!ue@_r1(}A.=">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="^NZw$qf}?Z#X\`5wbERmc">
                                        <value name="var1">
                                          <block type="variables_name_get" id="?ngKD\`b3Q2wLNTy656=e">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="(_:V6v-y*}@I%{\`2K+Wh">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_arithmetic" id="pKwNWR3+zpY@Ys$1~4|m">
                                        <field name="OP">POWER</field>
                                        <comment pinned="false" h="55" w="109">XOR command
1101
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="]n-1IA1enZJ1;f=L/,bC">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="VTUw2[p_,a%{QPTCM6~J">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="math_arithmetic" id="#jW%7hXLmuNX2ZE[vU2+">
                                        <field name="OP">STATEMENT5</field>
                                        <comment pinned="false" h="56" w="85">NOT USED
1100
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="negative_variable" id="\`Oq%0;{bP}oFl60{GjWJ">
                                            <value name="variable_name">
                                              <block type="variables_name_get" id="bc$J=E}M-qI-o|nL7Lf@">
                                                <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="negative_variable" id="nd_S(bPB,6NY%|3}]Fx?">
                                            <value name="variable_name">
                                              <block type="variables_name_get" id="U$06-k4jF?3Gg$1%vxOn">
                                                <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
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
                      </block>
                    </value>
                    <value name="else_value">
                      <block type="brackets_block" id="81E@dWzT^~@W5UAqqkeE">
                        <field name="bracketsLeft">normalLeft</field>
                        <field name="bracketsRight">normalRight</field>
                        <value name="variableInside">
                          <block type="if_statement" id="4i*]mA^Sjhd0xM+sjU@I">
                            <value name="if_value">
                              <block type="two_variables_dot" id="/[cTW9r2Imw/;GGYG-s}">
                                <value name="var1">
                                  <block type="variables_name_get" id="Op#~/.vy6{]b|7n-rDl\`">
                                    <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                  </block>
                                </value>
                                <value name="var2">
                                  <block type="math_number" id="e?XWG^N07iZLsSI[~o+@">
                                    <field name="NUM">1</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="then_value">
                              <block type="brackets_block" id="d\`ZIx4EY/za=X*R[Ae*z">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="Mwh6iRVUssuEqkg{}wfo">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="AxgDmq~Str#fYcG^Xhga">
                                        <value name="var1">
                                          <block type="variables_name_get" id="/7T?zT*%Nu;2rE]RDH:B">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="3*%m;D\`d{eJO[67*On$t">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_arithmetic" id="=~juLfPUrW\`^8+1R$X6j">
                                        <field name="OP">MINUS</field>
                                        <comment pinned="false" h="57" w="125">SUB command
1011
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="be:s~#F|E%)9i0VY:W-@">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="=96[d.8LQNCBZ7|#,jp!">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="math_arithmetic" id="/v2I2,Mr$U;|tQ-:n#zc">
                                        <field name="OP">ADD</field>
                                        <comment pinned="false" h="59" w="114">ADD command
1010
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id=",4\`yBw9+9)QZYp_wY_Ar">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="E]Tu3_jGEV\`@G*@*]!\`=">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="else_value">
                              <block type="brackets_block" id="pCM7.NOFL40Q-\`oAGet9">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="X+T65GIktLPemzp:mW;+">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="YtI-02]L~m3^h;meel1J">
                                        <value name="var1">
                                          <block type="variables_name_get" id="|N4rMZA0/G?rGZVUSV9;">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="Xr.G\`SeTzfW(z8iL1l:d">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_arithmetic" id="m(7/Z\`EvD,1|i9=vP}jk">
                                        <field name="OP">MINUS</field>
                                        <comment pinned="false" h="63" w="110">DEC command
1001
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="FHv\`cIH9%wg!~N/A*-.M">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="math_number" id="6e.*HT3]tMN)g4qDXS#/">
                                            <field name="NUM">1</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="math_arithmetic" id="*^ule3v#p(3.6B$qnzsy">
                                        <field name="OP">ADD</field>
                                        <comment pinned="false" h="58" w="107">INC command
1000
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="/io+mYZ|-}6D7*jMU;w#">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="math_number" id="Jgh-Sy5gK5U%CLj#JJQf">
                                            <field name="NUM">1</field>
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
                  </block>
                </value>
                <value name="else_value">
                  <block type="if_statement" id="X;I$0O+}Kho(ScdB0DyS">
                    <value name="if_value">
                      <block type="two_variables_dot" id="oAL6TpEwh~^R3S;cuR$u">
                        <value name="var1">
                          <block type="variables_name_get" id="ck8waAF$3|Jst(:Zf7!.">
                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                          </block>
                        </value>
                        <value name="var2">
                          <block type="math_number" id=".#6L]C)=wrtLX[kSXfY8">
                            <field name="NUM">2</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="then_value">
                      <block type="brackets_block" id="@Lp@p:9wBXT^7{oOi:$U">
                        <field name="bracketsLeft">normalLeft</field>
                        <field name="bracketsRight">normalRight</field>
                        <value name="variableInside">
                          <block type="if_statement" id="%@M9fnFRuM#JgeTkWq!F">
                            <value name="if_value">
                              <block type="two_variables_dot" id="vg3XX[hcuZ}!!rHFsJ0|">
                                <value name="var1">
                                  <block type="variables_name_get" id="tNA8v\`I.FBU(pnKUYQzN">
                                    <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                  </block>
                                </value>
                                <value name="var2">
                                  <block type="math_number" id="p67L+4BS=s/8Z*QmBWnc">
                                    <field name="NUM">1</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="then_value">
                              <block type="brackets_block" id="j-?:[@[Cl+;9)?jN}v2r">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="UOZp{pwH\`y}bAq/9ogdw">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="}\`(]d/oG;ypF04$_yZA5">
                                        <value name="var1">
                                          <block type="variables_name_get" id="m!Vxx3*$684hGAZ[Vg0d">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="+s=.MXFj.W$7diP_6%#$">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_arithmetic" id="RX$GO1_W$wk]139%O1*.">
                                        <field name="OP">STATEMENT9</field>
                                        <comment pinned="false" h="64" w="152">SHIFT LEFT command
0111
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="xXTVbMo/}:Z/GdPw{~/_">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="1:%y*W7_Uy^0dek4:zhf">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="math_arithmetic" id="[f*irVVyo3(h3JUiA*G2">
                                        <field name="OP">STATEMENT8</field>
                                        <comment pinned="false" h="63" w="159">SHIFT RIGHT command
0110
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="vMLiCmr}1;S$*^Ff#DJR">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="lb;GL}-7TMv8w*:[^/,S">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="else_value">
                              <block type="brackets_block" id="!(OOaNE*1cX]:0?%2v3E">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="}JOB]1-s*OT*LcwH}EJ*">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="o0lX+6LPwG5W;}bab5Q-">
                                        <value name="var1">
                                          <block type="variables_name_get" id="vQ$Nktah9_wRKi0uNmLG">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="[E|VcwL7vTQ)L@a|cLnq">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_arithmetic" id="P[Z$.V|2Hzc4968fF1@=">
                                        <field name="OP">STATEMENT7</field>
                                        <comment pinned="false" h="65" w="148">ROLL LEFT command
0101
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="Q}2:klYE}A|!c_h$Sl9}">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="=LH,D\`$y$6mIH~Cm,ZME">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="math_arithmetic" id="ztw@1dT~e_#^;fb5=HaE">
                                        <field name="OP">STATEMENT6</field>
                                        <comment pinned="false" h="63" w="165">ROLL RIGHT command
0100
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="8o9kWek$%HD{B)Y~ng$R">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id=";53^=+1!RbStc++xN%C3">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
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
                    <value name="else_value">
                      <block type="brackets_block" id="Sx9I{pW{p3VYM.,Ykbk]">
                        <field name="bracketsLeft">normalLeft</field>
                        <field name="bracketsRight">normalRight</field>
                        <value name="variableInside">
                          <block type="if_statement" id="t!WG/9|~KE}c(oKm!iQS">
                            <value name="if_value">
                              <block type="two_variables_dot" id="iqGxNZXvG.B,{b%GzY,Y">
                                <value name="var1">
                                  <block type="variables_name_get" id="0Q=J:*p~B:sinp:vjZ09">
                                    <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                  </block>
                                </value>
                                <value name="var2">
                                  <block type="math_number" id="fv#|]c-x2*Sq}?-%(aAt">
                                    <field name="NUM">1</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="then_value">
                              <block type="brackets_block" id="CN(B2T%W:de_G/9q6*nU">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="W@trhx}tS,6(U@G[1Y*a">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="-vcwRKr/5Me/jV35g;#2">
                                        <value name="var1">
                                          <block type="variables_name_get" id="4mhP%r16}$sm[pqk,J~*">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="},aY|^6Ga}-u5~]y(iyy">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_arithmetic" id="S?|nfscU;NDp4Xed;MpI">
                                        <field name="OP">STATEMENT2</field>
                                        <comment pinned="false" h="56" w="160">N0 (0 bit sum) cmd
0010
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="]Wr-zUB$-!WD#p%3Xauy">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="e,o8mr8+AFYYVzH)li}N">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="math_arithmetic" id="#vs_F~*;F{vPK8pT},K1">
                                        <field name="OP">STATEMENT4</field>
                                        <comment pinned="false" h="56" w="160">N0 (0 bit sum) cmd
0010
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                        
                                        </comment>
                                        <value name="A">
                                          <block type="variables_name_get" id="Bp$iiOw9n1)5QshzfMc,">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                                          </block>
                                        </value>
                                        <value name="B">
                                          <block type="variables_name_get" id="_O(:|qeb0ij.SMhjm=:p">
                                            <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="else_value">
                              <block type="brackets_block" id="h~Q;EI;PY|iMNnZnX|0t">
                                <field name="bracketsLeft">normalLeft</field>
                                <field name="bracketsRight">normalRight</field>
                                <value name="variableInside">
                                  <block type="if_statement" id="P:bt?awMkyVHj$SSx+3%">
                                    <value name="if_value">
                                      <block type="two_variables_dot" id="W5fLJA:W7-/!5[i7.a=V">
                                        <value name="var1">
                                          <block type="variables_name_get" id="Ua8/8C.iiZwh#/OEjp=g">
                                            <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                          </block>
                                        </value>
                                        <value name="var2">
                                          <block type="math_number" id="0Z$4g@;-_pSA^iL:;0KH">
                                            <field name="NUM">0</field>
                                          </block>
                                        </value>
                                      </block>
                                    </value>
                                    <value name="then_value">
                                      <block type="math_number" id="jwGARFA=1ba7*jBisR[J">
                                        <field name="NUM">0</field>
                                      </block>
                                    </value>
                                    <value name="else_value">
                                      <block type="negative_variable" id="rT7ow=qx(ExXP4]t6AU-">
                                        <value name="variable_name">
                                          <block type="variables_name_get" id="d;iQ=3,nKf)x!zdh2,%E">
                                            <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
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
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="variables_set" id="O[DnhFHE:;{P1gFT4(1w">
                <field name="VAR" id="*e\`)H~3|q_m{N,g_{p2M">ZF</field>
                <value name="VALUE">
                  <block type="if_statement" id="?oA!Nr(j;V@J3Ld/QSl!" inline="true">
                    <value name="if_value">
                      <block type="math_arithmetic" id="a5T:,sh_f)}(b/)D?Btw">
                        <field name="OP">STATEMENT4</field>
                        <value name="A">
                          <block type="variables_name_get" id="0}3E1l0xc?dc-^VaDHeC">
                            <field name="VAR" id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number" id="Iw12xGR_pVx?pRbm2vgY">
                            <field name="NUM">0</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <value name="then_value">
                      <block type="math_number" id="}__YhfU]+8vOn:f@3x?q">
                        <field name="NUM">1</field>
                      </block>
                    </value>
                    <value name="else_value">
                      <block type="math_number" id="%6or=1]VHzvlRLV5nBLJ">
                        <field name="NUM">0</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
                  <block type="variables_set" id="o8%6D_Z@c~xnPW=1pZXJ">
                    <field name="VAR" id="ag(idP9Z-HRf9l1\`kRB5">BAF</field>
                    <value name="VALUE">
                      <block type="if_statement" id="0P[Xcs3D=C?XgNHSh^|)" inline="true">
                        <value name="if_value">
                          <block type="math_arithmetic" id="lEIumqbE#-]A,A68!j4^">
                            <field name="OP">STATEMENT7</field>
                            <value name="A">
                              <block type="variables_name_get" id="xAN0;7~hlbfxJ=,pSk]J">
                                <field name="VAR" id="H(=q|NUaid08?N|\`El7*">x</field>
                              </block>
                            </value>
                            <value name="B">
                              <block type="variables_name_get" id=";p}KLb+owF8^SlVGcq*]">
                                <field name="VAR" id="*@%~6PzRg5xtJCKH3QK@">k</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <value name="then_value">
                          <block type="math_number" id="%Y#%_qNE{GW#1#rbgr|O">
                            <field name="NUM">1</field>
                          </block>
                        </value>
                        <value name="else_value">
                          <block type="if_statement" id="CuQI9_Bk3r7NLSe@OCi%" inline="true">
                            <value name="if_value">
                              <block type="math_arithmetic" id="$6)mW}m8p~uV?qB(;k%(">
                                <field name="OP">STATEMENT7</field>
                                <value name="A">
                                  <block type="variables_name_get" id="{$F*/G{RK6UO^CC#gr}t">
                                    <field name="VAR" id="E2raHhq)/La4hiUIxT:7">y</field>
                                  </block>
                                </value>
                                <value name="B">
                                  <block type="variables_name_get" id="[qUt[Dk3t[UP$NAD|*CO">
                                    <field name="VAR" id="*@%~6PzRg5xtJCKH3QK@">k</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="then_value">
                              <block type="math_number" id="tUfZPT#us/cR-HokwE5L">
                                <field name="NUM">1</field>
                              </block>
                            </value>
                            <value name="else_value">
                              <block type="math_number" id="Zd!*%=yH[/lT\`rO7l8_1">
                                <field name="NUM">0</field>
                              </block>
                            </value>
                          </block>
                        </value>
                      </block>
                    </value>
                    <next>
                      <block type="variables_set" id="7L:3w,K:0w/b+voMt]S;">
                        <field name="VAR" id="@L*+Q*u7m}!edn%YUB|#">IOF</field>
                        <value name="VALUE">
                          <block type="if_statement" id="%=[trMh]_]gZu=Yf,4kX" inline="true">
                            <value name="if_value">
                              <block type="math_arithmetic" id="6,IBCfeFLsm.}HNt-n)d">
                                <field name="OP">STATEMENT4</field>
                                <value name="A">
                                  <block type="variables_name_get" id="cuw!/ibb0S$wJj=bd~Tr">
                                    <field name="VAR" id="Z3w.[6:~~b@ayYODazRN">op</field>
                                  </block>
                                </value>
                                <value name="B">
                                  <block type="math_number" id="n^hCf?rpv_iHa5LOS2;z">
                                    <field name="NUM">1</field>
                                  </block>
                                </value>
                              </block>
                            </value>
                            <value name="then_value">
                              <block type="math_number" id=".H_7$*UZtR3Cs]~I(u91">
                                <field name="NUM">1</field>
                              </block>
                            </value>
                            <value name="else_value">
                              <block type="math_number" id="cC\`aH]o;GO6oKAFb/tOH">
                                <field name="NUM">0</field>
                              </block>
                            </value>
                          </block>
                        </value>
                        <next>
                          <block type="variables_set" id="xsSj14UXYJma8e}Da);X">
                            <field name="VAR" id="%leq=9Q#1$x0U!rgkY/;">z</field>
                            <value name="VALUE">
                              <block type="if_statement" id="-sS_RahI[a0nX;BaiCA}" inline="true">
                                <value name="if_value">
                                  <block type="math_arithmetic" id="\`O@WSFCAr60Olo-n_8lY">
                                    <field name="OP">STATEMENT7</field>
                                    <value name="A">
                                      <block type="variables_name_get" id="*dkdWo2bni/qYXFgzP,H">
                                        <field name="VAR" id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</field>
                                      </block>
                                    </value>
                                    <value name="B">
                                      <block type="variables_name_get" id="j);dc)opBLFVY%aH~J8L">
                                        <field name="VAR" id="*@%~6PzRg5xtJCKH3QK@">k</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <value name="then_value">
                                  <block type="math_arithmetic" id="A.s~fgrFscZ6-/w+#3S^">
                                    <field name="OP">MINUS</field>
                                    <value name="A">
                                      <block type="variables_name_get" id="a_95BpN+nM,0UB-e#;i]">
                                        <field name="VAR" id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</field>
                                      </block>
                                    </value>
                                    <value name="B">
                                      <block type="variables_name_get" id="o_4DhT5hjvz4*JdIC;\`,">
                                        <field name="VAR" id="*@%~6PzRg5xtJCKH3QK@">k</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <value name="else_value">
                                  <block type="variables_name_get" id="\`ov$Si$i]y~0gyl|M^jz">
                                    <field name="VAR" id="0V@vIZJuVpeV\`=~|_7PB">zNoRing</field>
                                  </block>
                                </value>
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
        </next>
      </block>
    </statement>
  </block>
</xml>`
    sendXmlToWorkspace(aluXml, false, "ALU.xml")
}
