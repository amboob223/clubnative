import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const imgdir = FileSystem.documentDirectory + "images/";

const ensureDirExist = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgdir); // this is checking for the images folder
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgdir, { intermediates: true });
    }
};

export default function Promo() {
    const [img, setImg] = useState(null); // it starts off as nothing
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        club: "",
        numsections: ""
    });

    useEffect(() => {
        ensureDirExist();
    }, []);

    const getPermissionsAsync = async () => {
        const { status } = await Location.requestBackgroundPermissionsAsync(); // this asks for permission of location
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Allow location access to use this app.");
        }
    }; // this is to get the permission for location access

    const pickImage = async () => {
        await getPermissionsAsync(); // we put await because we did async when we made it
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.canceled) {
            setImg(result.assets[0].uri); // this is a URI which is like a fake name for the assets
        } // if the result is not canceled
    };

    const takePhoto = async () => {
        await getPermissionsAsync();
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.canceled) {
            setImg(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://192.168.1.243:3000/promo/text", {
                method: "POST",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify({
                    namee: formData.name,
                    phone: formData.phone,
                    date: formData.date,
                    club: formData.club,
                    numsections: formData.numsections
                })
            });

            if (!response.ok) {
                console.error(response.status, response.statusText);
                Alert.alert("Error", "Something went wrong");
                return;
            }

            const { id } = await response.json(); // this is an id we are making to keep the image and form data together

            // now the image
            const formDataImg = new FormData();
            formDataImg.append("id", id);

            if (img) {
                const filename = img.split("/").pop();
                const fileInfo = {
                    uri: img, // because remember result.assets[0].uri
                    name: filename,
                    type: "image/jpg"
                };
                formDataImg.append("pic", fileInfo);
            }
            // upload
            const uploadResponse = await fetch("http://192.168.1.243:3000/promo/img", {
                method: "POST",
                body: formDataImg
            });

            if (!uploadResponse.ok) {
                console.error(uploadResponse.status, uploadResponse.statusText);
                Alert.alert("Error", "Something went wrong");
                return;
            }

            // now reset the form
            setFormData({
                namee: "",
                phone: "",
                date: "",
                club: "",
                numsections: ""
            });

            setImg(null);
            Alert.alert("Success", "You're good, now watch the club turn up");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "It's not working");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading}>Fill out the form to get clubbers</Text>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <TextInput
                    placeholder="Phone"
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                />
                <TextInput
                    placeholder="Date"
                    style={styles.input}
                    value={formData.date}
                    onChangeText={(text) => setFormData({ ...formData, date: text })}
                />
                <TextInput
                    placeholder="Club"
                    style={styles.input}
                    value={formData.club}
                    onChangeText={(text) => setFormData({ ...formData, club: text })}
                />
                <TextInput
                    placeholder="NumSections"
                    style={styles.input}
                    value={formData.numsections}
                    onChangeText={(text) => setFormData({ ...formData, numsections: text })}
                />
                <Button title="Upload Sections" onPress={pickImage} />
                <Button title="Take a Photo" onPress={takePhoto} />
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#282c34", // Background color for the entire screen
        flex: 1
    },
    form: {
        margin: 30,
        marginTop: 10
    },
    heading: {
        fontSize: 18,
        color: "#61dafb", // Header text color
        marginBottom: 20
    },
    input: {
        backgroundColor: "#fff", // Input field background color
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        color: "#333" // Input text color
    }
});
