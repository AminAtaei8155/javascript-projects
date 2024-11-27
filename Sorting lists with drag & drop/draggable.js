class Draggable {
    dragSrcEl;
    list;
    update;
    constructor(options){
        this.setupList(options);
        this.list = options.list;


        if (options.update) this.update = options.update;

        for (let listItem of options.el.children){
            this.addDnDHandlers(listItem)
        }
    }

    setupList(options){
        let  {list , el : element , template} = options;

        if (! list) throw  Error ('this data is not exists');
        if (! element) throw  Error ('this list is not exists');
        if (! Array.isArray(list)) throw Error ('the list is note an array, please insert an array');
        if (! template) throw ('please add a template function');
        if (typeof  template != "function") throw Error ('please add a function as template');

        list.forEach(item => element.innerHTML += template(item))
    }

    addDnDHandlers(element){
        element.setAttribute('Draggable' , true);

        element.addEventListener('dragstart' , this.handlerDragStart.bind(this));
        element.addEventListener('dragenter' , this.handlerDragEnter.bind(this));
        element.addEventListener('dragover' , this.handlerDragOver.bind(this));
        element.addEventListener('dragleave' , this.handlerDragLeave.bind(this));
        element.addEventListener('drop' , this.handlerDragDrop.bind(this));
        element.addEventListener('dragend' , this.handlerDragEnd.bind(this));
    }
    handlerDragStart(e){
        this.dragSrcEl = e.target;

        e.dataTransfer.setData('text/html' , e.target.outerHTML);
        e.target.classList.add('dragElem');
    }

    handlerDragEnter(e){
    }

    handlerDragOver(e){
        if(e.preventDefault) e.preventDefault();

        e.target.classList.add('over');
    }

    handlerDragLeave(e){
        e.target.classList.remove('over');
    }

    handlerDragDrop(e){

        let target = e.target.closest('.list-item');
        if (this.dragSrcEl != target){
            target.parentNode.removeChild(this.dragSrcEl);
            let dropHTML = e.dataTransfer.getData('text/html');
            target.insertAdjacentHTML('beforebegin' , dropHTML);
            this.addDnDHandlers(target.previousSibling);
        }
        e.target.classList.remove('over');
    }

    handlerDragEnd(e){
        e.target.classList.remove('dragElem');

        let newList = [];
        list.querySelectorAll('.list-item').forEach(elm => newList.push(this.list.find(item => elm.id == item.id)))
        this.update(newList)
    }
}