import { Feather } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"

const UploadButton = ()=>{
    return (
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            position: "absolute",
            right: 24,
            bottom: 108,
            width: 52,
            height: 52,
            borderRadius: 26,
            borderWidth: 2,
            borderColor: "#8749f1",
            backgroundColor: "#5b21b6",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="plus" size={22} color="white" />
        </TouchableOpacity>
    )
}

export default UploadButton