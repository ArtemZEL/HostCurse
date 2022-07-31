function forms(){
    //Forms
    const forms=document.querySelectorAll('form');

    const message={
        loading:'img/form/826.svg',
        succes:'Спасибо! Мы свяжемся с вами :)',
        failure:'Простите что не так...'
    };
    
    forms.forEach(item=>{
        bindPostData(item);
    });

    const postData= async (url,data)=>{
        const res= await fetch(url,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:data
        });
        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            const statusMessage=document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText=`
                display:block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend',statusMessage);

            // const request=new XMLHttpRequest();
            // request.open('POST','Server.php');




            //request.setRequestHeader('Content-type','multipart/form-data');
            //request.setRequestHeader('Content-type','application/json');//получение данных в формате json
            
            const formData=new FormData(form);

            // const object={};
            // formData.forEach(function(value,key){
            //     object[key]=value;
            // });

            const json=JSON.stringify(Object.fromEntries(formData.entries()));
//            const obj={a:23,b:50};
//            console.log(Object.entries(obj));

            //request.send(json);
            //request.send(formData);
            
            // fetch('Server.php',{
            //     method:"POST",
            //       headers:{
            //         'Content-type':'application/json'
            //       },
            //       body:JSON.stringify(object)
                
            // })
            postData('http://localhost:3000/requests', json)
            .then(data=>{
                    console.log(data);
                    showThancksModal(message.succes);
                    form.reset();
                    statusMessage.remove();
            }).catch(()=>{
                showThancksModal(message.failure);
            }).finally(()=>{
                form.reset();
            });

            // request.addEventListener('load',()=>{
            //     if(request.status===200){
            //         console.log(request.response);
            //         showThancksModal(message.succes);
            //         form.reset();
            //         statusMessage.remove();
            //     }
            //     else
            //     {
            //         showThancksModal(message.failure);
            //     }
            // });

        });
    }
    function showThancksModal(message){
        const prevMOdalDialog=document.querySelector('.modal__dialog'); 
         
        prevMOdalDialog.classList.add('hide');
        openModal();

        const thanksModal=document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevMOdalDialog.classList.add('show');
            prevMOdalDialog.classList.remove('hide');
            closeModal();
        },4000);
    }   
    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method:"POST",
    //     body:JSON.stringify({name:'Marti'}),
    //     headers:{
    //         'Content-type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));
    // fetch('http://localhost:3000/menu')
    // .then(data=>data.json())
    // .then(res=>console.log(res));
}
module.exports=forms;