import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { SigninDTO } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IUserRepositary } from './interfaces/user.repository.interface';
@Injectable()
export class AuthService {
    constructor(
        @Inject('IUserRepository') private readonly userRepositary: IUserRepositary,
        private jwtService: JwtService) {

    }
    async signup(signupData: SignupDTO, res: Response) {

        const { email, name, password } = signupData;
        //  if email exists
        const existEmail = await this.userRepositary.findByEmail(email);
        if (existEmail) {
            throw new BadRequestException('Email already in use');
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //  savee db
        const user = await this.userRepositary.create({
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
        console.log("user is this", user,)

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
        const user = await this.userRepositary.findByEmail(email);
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
            maxAge: 15 * 60 * 1000,
            sameSite: 'strict',    
            secure: true,
            path: '/',              
            partitioned: true, //for brwoser warning
        });
    }

    private clearCookie(res: Response) {
        res.cookie('access_token', '');
    }
}
