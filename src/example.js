/*
export default [
  'digraph {\n'
    + '\tnode [shape=record];\n'
    + '\tstruct0 [label="<f0> |<f1> 3|<f2> "];\n'
    + '\tstruct0:<f0> -> struct1;\n'
    + '\tstruct1 [label="<f0> |<f1> 2|<f2> "];\n'
    + '\tstruct1:<f0> -> struct2;\n'
    + '\tstruct2 [label=leaf, shape=ellipse];\n'
    + '\tstruct1:<f2> -> struct3;\n'
    + '\tstruct3 [label=leaf, shape=ellipse];\n'
    + '\tstruct0:<f2> -> struct4;\n'
    + '\tstruct4 [label="<f0> |<f1> 4|<f2> "];\n'
    + '\tstruct4:<f0> -> struct5;\n'
    + '\tstruct5 [label=leaf, shape=ellipse];\n'
    + '\tstruct4:<f2> -> struct6;\n'
    + '\tstruct6 [label=leaf, shape=ellipse];\n'
    + '}',
  'digraph {\n'
  + '\tnode [shape=record];\n'
  + '\tstruct0 [label="<f0> |<f1> 3|<f2> "];\n'
  + '\tstruct0:<f0> -> struct1;\n'
  + '\tstruct1 [label=""];\n'
  + '\tstruct1:<f2> -> struct3;\n'
  + '\tstruct3 [label=leaf, shape=ellipse];\n'
  + '\tstruct0:<f2> -> struct4;\n'
  + '\tstruct4 [label="<f0> |<f1> 4|<f2> "];\n'
  + '\tstruct4:<f0> -> struct5;\n'
  + '\tstruct5 [label=leaf, shape=ellipse];\n'
  + '\tstruct4:<f2> -> struct6;\n'
  + '\tstruct6 [label=leaf, shape=ellipse];\n'
  + '}',
  'digraph {\n'
  + '\tnode [shape=record];\n'
  + '\tstruct0 [label=""];\n'
  + '\tstruct3 [label=leaf, shape=ellipse];\n'
  + '\tstruct0 -> struct4;\n'
  + '\tstruct4 [label="<f-2> |<f-1> 3|<f0> |<f1> 4|<f2> "];\n'
  + '\tstruct4:<f0> -> struct5;\n'
  + '\tstruct4:<f-2> -> struct3;\n'
  + '\tstruct5 [label=leaf, shape=ellipse];\n'
  + '\tstruct4:<f2> -> struct6;\n'
  + '\tstruct6 [label=leaf, shape=ellipse];\n'
  + '}',
  'digraph {\n'
  + '\tnode [shape=record];\n'
  + '\tstruct3 [label=leaf, shape=ellipse];\n'
  + '\tstruct4 [label="<f-2> |<f-1> 3|<f0> |<f1> 4|<f2> "];\n'
  + '\tstruct4:<f0> -> struct5;\n'
  + '\tstruct4:<f-2> -> struct3;\n'
  + '\tstruct5 [label=leaf, shape=ellipse];\n'
  + '\tstruct4:<f2> -> struct6;\n'
  + '\tstruct6 [label=leaf, shape=ellipse];\n'
  + '}',
];
*/

export default {
  name: 'abtree-merge',
  frames: [
    {
      name: 'Frame 0',
      graph: 'digraph {\n'
          + '\tnode [shape=record];\n'
          + '\tstruct0 [label="<f0> |<f1> 3|<f2> "];\n'
          + '\tstruct0:<f0> -> struct1;\n'
          + '\tstruct1 [label="<f0> |<f1> 2|<f2> "];\n'
          + '\tstruct1:<f0> -> struct2;\n'
          + '\tstruct2 [label=leaf, shape=ellipse];\n'
          + '\tstruct1:<f2> -> struct3;\n'
          + '\tstruct3 [label=leaf, shape=ellipse];\n'
          + '\tstruct0:<f2> -> struct4;\n'
          + '\tstruct4 [label="<f0> |<f1> 4|<f2> "];\n'
          + '\tstruct4:<f0> -> struct5;\n'
          + '\tstruct5 [label=leaf, shape=ellipse];\n'
          + '\tstruct4:<f2> -> struct6;\n'
          + '\tstruct6 [label=leaf, shape=ellipse];\n'
          + '}',
    },
    {
      name: 'Remove 2',
      graph: 'digraph {\n'
          + '\tnode [shape=record];\n'
          + '\tstruct0 [label="<f0> |<f1> 3|<f2> "];\n'
          + '\tstruct0:<f0> -> struct1;\n'
          + '\tstruct1 [label=""];\n'
          + '\tstruct1:<f2> -> struct3;\n'
          + '\tstruct3 [label=leaf, shape=ellipse];\n'
          + '\tstruct0:<f2> -> struct4;\n'
          + '\tstruct4 [label="<f0> |<f1> 4|<f2> "];\n'
          + '\tstruct4:<f0> -> struct5;\n'
          + '\tstruct5 [label=leaf, shape=ellipse];\n'
          + '\tstruct4:<f2> -> struct6;\n'
          + '\tstruct6 [label=leaf, shape=ellipse];\n'
          + '}',
    },
    {
      name: 'Merge',
      graph: 'digraph {\n'
          + '\tnode [shape=record];\n'
          + '\tstruct0 [label=""];\n'
          + '\tstruct3 [label=leaf, shape=ellipse];\n'
          + '\tstruct0 -> struct4;\n'
          + '\tstruct4 [label="<f-2> |<f-1> 3|<f0> |<f1> 4|<f2> "];\n'
          + '\tstruct4:<f0> -> struct5;\n'
          + '\tstruct4:<f-2> -> struct3;\n'
          + '\tstruct5 [label=leaf, shape=ellipse];\n'
          + '\tstruct4:<f2> -> struct6;\n'
          + '\tstruct6 [label=leaf, shape=ellipse];\n'
          + '}',
    },
    {
      name: 'Remove Root',
      graph: 'digraph {\n'
          + '\tnode [shape=record];\n'
          + '\tstruct3 [label=leaf, shape=ellipse];\n'
          + '\tstruct4 [label="<f-2> |<f-1> 3|<f0> |<f1> 4|<f2> "];\n'
          + '\tstruct4:<f0> -> struct5;\n'
          + '\tstruct4:<f-2> -> struct3;\n'
          + '\tstruct5 [label=leaf, shape=ellipse];\n'
          + '\tstruct4:<f2> -> struct6;\n'
          + '\tstruct6 [label=leaf, shape=ellipse];\n'
          + '}',
    },
  ],
};
