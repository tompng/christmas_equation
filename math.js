var MathFunc={
  tokenize: function(s){
    s=s.replace(/\s/g,'');
    var tokens=[],match;
    while(s){
      if(match=s.match(/^[a-zA-Z0-9_.]+|[+\-\*\/\(\),\^]/)){
        tokens.push(match[0]);
        s=s.substr(match[0].length);
      }else{
        throw "unknown operator '"+s[0]+"'"
      }
    }
    return tokens;
  },
  construct: function(tokens){
    var kakko=0;
    var kakkoinside;
    var exps=[];
    tokens.forEach(function(token){
      if(token=='('){if(kakko==0)kakkoinside=[];else kakkoinside.push(token);kakko++;return}
      if(token==')'){kakko--;if(kakko==0)exps.push(MathFunc.construct(kakkoinside));else kakkoinside.push(token);return;}
      if(kakko){
        kakkoinside.push(token);
      }else{
        exps.push(token);
      }
    })
    return exps;
  },
  parse: function(s){
    return this._parse(this.construct(this.tokenize(s)));
  },
  _parse: function(exps){
    if(exps.length==1&&typeof exps[0]=='object')return MathFunc._parse(exps[0])
    function split(exps,op){
      var section=[];
      var out=[section];
      exps.forEach(function(c){
        if(c==op){
          out.push(section=[]);
        }else{
          section.push(c);
        }
      })
      return out;
    }
    var args;
    var ops=[',','+','-','*','/','^'];
    for(var i=0;i<ops.length;i++){
      var op=ops[i];
      var args=split(exps,op);
      if(args.length==1)continue;
      return {
        type: 'func',
        func: op,
        args: args.map(MathFunc._parse)
      }
    }
    if(exps.length==2&&exps[0].match&&exps[0].match(/^[a-zA-Z0-9_]+$/)){
      var func=exps[0];
      var arg=MathFunc._parse(exps[1]);
      return {
        type: 'func',
        func: func,
        args: arg.func==','?arg.args:[arg]
      }
    }
    if(exps.length==1){
      if(exps[0].match&&exps[0].match(/^[\d.]+/)){
        return {type: 'number', value: parseFloat(exps[0])}
      }
      return {type: 'var', value: exps[0]}
    }
    if(exps.length==0)return null;
    throw 'hogee'
  },
  generate: function(s){
    lines=s.split('\n');
    var variables=[]
    var exp=MathFunc.parse(lines.pop());
    lines.forEach(function(line){
      var defs=line.split('=');
      variables.push({name: defs[0].replace(/[^a-zA-Z0-9_]/,''), exp: MathFunc.parse(defs[1])});
    });
    function stringify(exp){
      if(exp.type=='number')return exp.value.toString();
      if(exp.type=='var')return exp.value;
      else{
        if('+-*/'.indexOf(exp.func)>=0){
          return exp.args.map(function(a){
            return a?'('+stringify(a)+')':'';
          }).join(exp.func);
        }
        if(exp.func=='^'){
          return 'Math.pow(('+stringify(exp.args[0])+'),('+stringify(exp.args[1])+'))'
        }
        return 'Math.'+exp.func+'('+exp.args.map(function(a){return '('+stringify(a)+')'}).join(',')+')'
      }
    }
    return eval(
      '(function(x,y,z){'+
        variables.map(function(o){return 'var '+o.name+'='+stringify(o.exp)+';'}).join('')+
        'return '+stringify(exp)+
      '})'
    );
  }
};
