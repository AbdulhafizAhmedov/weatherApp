import { Schema, model } from "mongoose";

const CitySchema = new Schema({
    ciTy: {type: String, required: true,},
    user: {type: Schema.Types.ObjectId, ref: "User"}
},
{timestamps: true}
);

CitySchema.index({ciTy: 1, user: 1}, {unique: true});

const City = model("City", CitySchema);
export default City;