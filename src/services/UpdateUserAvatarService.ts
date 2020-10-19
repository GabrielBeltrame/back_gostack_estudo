import {getRepository} from 'typeorm';
import {User} from '../models/User';
import path from 'path';
import fs from 'fs';
import uploaderConfig from '../config/upload';
import AppError from '../errors/AppError'

interface Request {
  user_id: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401);
    }

    if (user.avatar) {
      // deletar avatar anterior

      const userAvatarFilePath = path.join(uploaderConfig.directory, user.avatar);
      const userAvatarFileExiste = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExiste) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}
