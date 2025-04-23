class Api {
  async read_file(path: string): Promise<any> {
    return await default_api.read_file(path);
  }

  async natural_language_write_file(options: {
    path: string;
    language: string;
    prompt: string;
  }): Promise<any> {
    const { path, prompt, language } = options;
    try {
      try {
        await default_api.read_file(path);
        await default_api.delete_file(path);
      } catch(e) {
        
      }
      
      const createFileResponse = await default_api.create_file({
        path,
        prompt
      });

        return { result: "The file was created", status: "succeeded" };

    } catch (error) {
        console.error('Error saving quote:', error);
        return { result: `Failed to save quote: ${error}`, status: "failed" };
    }
  }

  async delete_file(path: string): Promise<any> {
    return await default_api.delete_file(path);
  }

  async run_terminal_command(command: string): Promise<any> {
    return await default_api.run_terminal_command(command);
  }

  async list_project_files(path: string): Promise<any> {
    return await default_api.list_project_files(path);
  }
    async list_files(): Promise<any> {
    return await default_api.list_files();
  }
}

export const default_api = new Api();