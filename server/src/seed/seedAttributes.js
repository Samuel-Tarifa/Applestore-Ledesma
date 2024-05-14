const attributes = [
  { name: 'El exterior de silicona tiene un acabado suave y sedoso al tacto. Y el interior está forrado con una suave microfibra para una mayor protección.' },
  { name: 'Función anti golpes.' },
  { name: 'El mejor agarre y comodidad en mano.' },
  { name: 'La parte inferior de la funda es cerrada.' }
];


async function createAttributes() {
  try {
    const attributesCreated = await db.attribute.createMany({data:attributes})
    console.log('Attributes created successfully')
    return attributesCreated
  } catch (error) {
    console.error(error)
  }
}

//console.log(createAttributes())