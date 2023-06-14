import { Schema, model, Model, Types } from 'mongoose'
import bcrypt from 'bcrypt';

export enum NivelUser {
    Consumidor = 'consumidor',
    Administrador = 'administrador',
};

interface IUser {
    nome: string,
    email: string,
    password: string,
    nivel: string,
    dataRegisto: Date,
    dataUltimoAcesso: Date,
};

interface IUserMethods {
    isPasswordValid(password: string): Promise<boolean>;
}

export type UserType = IUser & IUserMethods & { _id: Types.ObjectId };

export type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nivel: {
        type: String,
        enum: Object.values(NivelUser),
        default: NivelUser.Consumidor,
    },
    dataRegisto: {
        type: Date,
        default: Date.now(),
    },
    dataUltimoAcesso: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.method('isPasswordValid', async function isPasswordValid(password: string) {
    return await bcrypt.compare(password, this.password);
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        return next(error);
    }
});

export const User = model("users", UserSchema);
