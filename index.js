let global=[];
petList=document.getElementById("petList");
const addPet=()=>{
    const addDetails ={
        id:`${Date.now()}`,
        img:document.getElementById("imageUrl").value,
        petType:document.getElementById("petType").value,
        petName:document.getElementById("petName").value,
        petDes:document.getElementById("petDes").value,
        status:document.getElementById("status").value,
        price:document.getElementById("price").value,
    };
    petList.insertAdjacentHTML('beforeend',generateCard(addDetails));
    global.push(addDetails);
    saveToLocal();
    console.log(global);
}

const generateCard= ({img,id,petType,petName,status,price}) =>{
    return (`
            <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
                <div class="card">
                <a style="display:none">${petName}</a>
                    <div class="card-header">
                        <div class="card-header d-flex justify-content-between">
                            <div>
                            <h2>${petType}</h2>
                            </div>
                            <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-info" onclick="updateCard(${id})" data-bs-toggle="modal" data-bs-target="#edit">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger ms-2" onclick="deleteDetail(${id})">
                                        <i class="far fa-trash-alt"></i>
                                </button>
                                <a type="button" class="btn btn-outline-success ms-2" href="https://api.whatsapp.com/send?text=Hello guys this is my online pet store.Visit now @ https://condescending-meitner-e132cf.netlify.app/">
                                    <i class="fas fa-share pt-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body" style="display:flex;justify-content:space-evenly">
                        <div>
                            <h3>${petName}</h3>
                            <h5>Status :&nbsp&nbsp<span class="badge bg-success">${status}</span></h5>
                            <h5>Price : &nbsp&nbsp$ ${price}</h5>
                        </div>
                        <div>
                            <img class="card-img" src="${img}" alt="Card image cap" height="100px" width="60px">
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="button" onclick="viewSend(${id})" class="btn btn-outline-primary float-end" data-toggle="modal" data-target="#exampleModalCenter">
                            View Details
                        </button>
                    </div>
                </div>
            </div>`)
        }
const saveToLocal=()=>
{
    localStorage.setItem("pet",JSON.stringify({items:global}));
}
const reloadCard=()=>{
    const temp=JSON.parse(localStorage.getItem("pet"));
    if(temp)
    {
        global=temp["items"]
    }
    global.map((cardDetail)=>{
        petList.insertAdjacentHTML('beforeend',generateCard(cardDetail));
    });
}
// Delete card
const deleteDetail =(e) =>{
    global.forEach((item)=>{
        const index = global.indexOf(item);
            if(item.id==e)
            {
                console.log(item);
                global.splice(index,1);
            }
    })
    saveToLocal();
    window.location.reload();
}

// Edit Card
const updateCard =(e)=>
{
    global.forEach((item)=>{
        const index = global.indexOf(item);
            if(item.id==e)
            {
                url=item.img;
                ptype=item.petType;
                pName=item.petName;
                pDes=item.petDes;
                stat=item.status;
                price=item.price;
            }
    })
    u=document.getElementById("Url");
    u.value=url;
    v=document.getElementById("ptype");
    v.value=ptype;
    t=document.getElementById("pName");
    t.value=pName;
    ty=document.getElementById("pDes");
    ty.value=pDes;
    d=document.getElementById("stat");
    d.value=stat;
    p=document.getElementById("cost");
    p.value=price;
    i=document.getElementById("i_D");
    i.value=e;
}

const reedit=()=>{
    petId=document.getElementById("i_D").value;
    global.forEach((item)=>{
        if(item.id==petId)
        {
            u=document.getElementById("Url").value; 
            item.img=u;
            v=document.getElementById("ptype").value;
            item.petType=v;
            t=document.getElementById("pName").value;
            item.petName=t;
            ty=document.getElementById("pDes").value;
            item.petDes=ty;
            d=document.getElementById("stat").value;
            item.status=d;
            p=document.getElementById("cost").value;
            item.price=p;
        }
    })
    saveToLocal();
    window.location.reload();
}

// View Description of the Pet
const viewSend=(e)=>
{
    global.forEach((item)=>{
    const index = global.indexOf(item);
        if(item.id==e)
        {
            var imageview=document.getElementById("imgview");
            imageview.src=item.img;
            var desview=document.getElementById("descpview");
            desview.innerHTML=item.petDes;
        }
    })    
}

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("petList");
    li = ul.getElementsByClassName("card");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}