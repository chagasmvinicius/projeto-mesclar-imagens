// Obtendo o src da nova imagem upada
const inputImg = document.getElementById('img-input');
let source;

inputImg.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64Image = event.target.result;
      sessionStorage.removeItem('new-image-base64'); // Limpar o sessionStorage
      console.log('Chave "new-image-base64" removida do sessionStorage.');
      sessionStorage.setItem('new-image-base64', base64Image);
      console.log('Imagem salva no sessionStorage.');
      exibirImagem();
    };

    reader.readAsDataURL(file);
  }

  function exibirImagem() {
    const newImg = document.getElementById('newImg');
    const base64Image = sessionStorage.getItem('new-image-base64');

    if (base64Image) {
      newImg.src = base64Image;
      console.log('Nova imagem vinculada à tag <img>.');
    }
  }
});

function download() {
  const imageContainer = document.querySelector('.image-container');
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const context = canvas.getContext('2d');

  // Aumentar a qualidade do desenho para melhorar o resultado
  context.imageSmoothingQuality = 'high';

  // Desenhar as imagens no canvas
  const images = imageContainer.querySelectorAll('img');
  images.forEach((img) => {
    const width = canvas.width;
    const height = canvas.height;
    context.drawImage(img, 0, 0, width, height);
    if (img.id == 'newImg') console.log('A nova imagem foi editada e baixada.');
  });

  sessionStorage.removeItem('new-image-base64'); // Limpar o sessionStorage
  console.log('Chave "new-image-base64" removida do sessionStorage.');

  // Criar um link para download da imagem
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png'); // Converter o canvas para uma URL de imagem
  link.download = `NovaImagemEditada_${new Date().getMilliseconds().toFixed(0)}.png`; // Definir o nome do arquivo para download

  // Clicar no link automaticamente para iniciar o download
  link.click();
  //location.reload(true);
};