import{r as a,c as u,a as e,m as f,n as i,v as m,F as y,p as b,o as d,q as v}from"./fNgEoHnC.js";const g={class:"min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"},x={class:"relative py-3 sm:max-w-xl sm:mx-auto"},w={class:"relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"},h={class:"max-w-md mx-auto"},_=["id","onUpdate:modelValue","placeholder"],k=["id","value"],q=["for"],B={__name:"createQuiz",setup(Q){const r=a(""),s=a(["","","",""]),l=a(null),p=()=>{console.log("New Question:",{question:r.value,options:s.value,correctAnswer:l.value})};return(V,o)=>(d(),u("div",g,[e("div",x,[o[5]||(o[5]=e("div",{class:"absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"},null,-1)),e("div",w,[e("div",h,[o[4]||(o[4]=e("h1",{class:"text-2xl font-semibold mb-6"},"Create a Quiz Question",-1)),e("form",{onSubmit:f(p,["prevent"]),class:"space-y-4"},[e("div",null,[o[2]||(o[2]=e("label",{for:"question",class:"block text-sm font-medium text-gray-700"},"Question",-1)),i(e("input",{id:"question","onUpdate:modelValue":o[0]||(o[0]=c=>r.value=c),type:"text",required:"",class:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"},null,512),[[m,r.value]])]),(d(!0),u(y,null,b(s.value,(c,t)=>(d(),u("div",{key:t,class:"flex items-center space-x-2"},[i(e("input",{id:"option"+t,"onUpdate:modelValue":n=>s.value[t]=n,type:"text",required:"",class:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500",placeholder:"Option "+(t+1)},null,8,_),[[m,s.value[t]]]),i(e("input",{id:"correct"+t,"onUpdate:modelValue":o[1]||(o[1]=n=>l.value=n),type:"radio",value:t,class:"focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"},null,8,k),[[v,l.value]]),e("label",{for:"correct"+t,class:"text-sm text-gray-700"},"Correct",8,q)]))),128)),o[3]||(o[3]=e("button",{type:"submit",class:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"}," Create Question ",-1))],32)])])])]))}};export{B as default};