import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SigninDTO } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModal: Model<User>,
        private jwtService: JwtService) {

    }
    async signup(signupData: SignupDTO, res: Response) {

        const { email, name, password } = signupData;
        //  if email exists
        const existEmail = await this.UserModal.findOne({ email });
        if (existEmail) {
            throw new BadRequestException('Email already in use');
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //  savee db
        const user = await this.UserModal.create({
            name,
            email,
            password: hashPassword,
        });

        // generate  token
        const token = await this.generateToken({
            name: user.name,
            email: user.email,
            _id: user._id
        });

        this.setCookie(res, token);


        return {
            message: "register successfull",
            accessToken: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        }
    }

    async signin(credentials: SigninDTO, res: Response) {
        const { email, password } = credentials;

        // check  if user exists
        const user = await this.UserModal.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Wrong credentials');
        }

        // compare with existing password
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new UnauthorizedException('Wrong credentials');
        }

        // generate  token
        const token = await this.generateToken({
            name: user.name,
            email: user.email,
            _id: user._id
        });

        this.setCookie(res, token);
        return {
            message: "login successfull",
            accessToken: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        }
    }

    async logout(userId: string, res: Response) {
        this.clearCookie(res);
        return { message: 'Logout successful' };
    }

    async generateToken(payload) {
        return this.jwtService.signAsync(payload);
    }

    private setCookie(res: Response, token: string) {
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });
    }

    private clearCookie(res: Response) {
        res.cookie('access_token', '');
    }
}
