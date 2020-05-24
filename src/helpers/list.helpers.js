export const translateField = name => {

    console.log('name: ', name);
    const handleRes = {
        name: 'Nome',
        email: 'Email',
    }
    return handleRes[name];

}