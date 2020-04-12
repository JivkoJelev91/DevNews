

export const hasError = () => {
    
    const schema = [
         {
            name: 'Title',
            type: 'text',
            value: 'value',
            required: true,
            error: '',
        },
        {
            name: 'Title Image',
            type: 'image',
            value: 'value',
            required: true,
            error: '',
        },
        {
            name: 'Body Text',
            type: 'text',
            value: 'value',
            required: false,
            error: '',
        },
    ];

    schema.forEach(conf => {
        if(conf.type === 'text'){
            if(isEmpty(conf.value) && conf.required){
                conf.error = `${conf.name} is required!`; 
            }
        }
        if(conf.type === 'image'){
            if(isImage(conf.value)){
                conf.error = isImage(conf.value) 
            }
        }
    });

    // const errors = validationStateSchema(title, titleImage, bodyText);
    // const errorKey = Object.keys(errors).find(x => errors[x]);
    // if (errors[errorKey]) return errors[errorKey];
}

const validator = () => {

}

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

// const isText = text => isEmpty(text) ? ' is required!' : null;

const isImage = file => {
    const ext = file && file.type.split('/').pop().toLowerCase();
    const extensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
    const errors = {
        emptyFile: !file || isEmpty(file.name) ? 'Image is required!' : null,
        wrongFile: !extensions.includes(ext) ? 'Please select a valid image file' : null,
        bigSize: file.size > 1024000 ? 'The image is too large!' : null,
    };
    const errorKey = Object.keys(errors).find(x => errors[x]);
    return errors[errorKey];
};