import { RegisterNewUser } from '../../../../domain/usecases/admin/register-new-user';
import { AdmAuthAdapter } from '../../../infra/admin/adm-auth';
import { Encrypter } from '../../protocols/criptograph/pass';
import { RegisterNewUserRepository } from '../../protocols/criptograph/register-new-user';

export class RegisterNewUserAbstract implements RegisterNewUser {
  constructor(
    private readonly registerNewUserRepository: RegisterNewUserRepository,
    private readonly encrypterPass: Encrypter,
    private readonly admAuth: AdmAuthAdapter,
  ) {}

  async register(
    params: RegisterNewUser.Params,
  ): Promise<RegisterNewUser.Result> {
    const isAdmAuth = this.admAuth.isAdmAuth(params.key);
    if (!isAdmAuth) return { isValid: false, errorName: 'ACCESS DENIED' };
    const isUserExists = await this.registerNewUserRepository.isUserExists(
      params.email,
    );
    if (!isUserExists.isValid)
      return { isValid: false, errorName: 'User already exists' };
    const encrypterPass = await this.encrypterPass.encrypterPass(
      params.password,
    );
    const userWithHashedPass = { ...params, password: encrypterPass };
    userWithHashedPass.key = '';
    const user = await this.registerNewUserRepository.registerNewUser(
      userWithHashedPass,
    );
    delete user.body.password;
    return { isValid: true, body: user.body };
  }
}
