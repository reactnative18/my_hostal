import storage from '@react-native-firebase/storage';
import { Image } from 'react-native-compressor';

const uploadImages = async (imgName,uploadURI,callback) => {
    try {
        const compressedImageUri = await Image.compress(uploadURI, {
            compressionMethod: 'auto',  // Auto compress
            quality: 0.5,               // Compression quality
        });
        const reference = storage().ref(imgName); 
        const uploadStatus = await reference.putFile(compressedImageUri);
        if(uploadStatus.state=='success'){
            storage()
                .ref(imgName)
                .getDownloadURL()
                .then((result) => {
                    if (result != null) {
                        console.log('Image uploaded uri=>', result)
                        callback(result)
                    }
                })
        }
    } catch (error) {
        console.log('Image uploaded error=>', error);
    }
}

export {
    uploadImages
}