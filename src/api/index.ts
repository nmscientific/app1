import { default_api as api } from "../api";

class Api {
  async read_file(path: string): Promise<any> {
    return await api.read_file(path);
  }

  async natural_language_write_file(params: {
    language: string;
    path: string;
    prompt: string;
  }): Promise<any> {
    return await api.natural_language_write_file(params);
  }

  async delete_file(path: string): Promise<any> {
    return await api.delete_file(path);
  }

  async run_terminal_command(command: string): Promise<any> {
    return await api.run_terminal_command(command);
  }

  async list_project_files(path: string): Promise<any> {
    return await api.list_project_files(path);
  }
  async list_files(): Promise<any> {
    return await api.list_files();
  }
}

export const default_api = new Api();