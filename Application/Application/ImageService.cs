using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace Application
{
    public class ImageService
    {

        private string CleanFileName(string fileName)
        {
            char[] InvalidFileNameChars = Path.GetInvalidFileNameChars();
            char[] URLSymbols = new char[6] {
                ' ',
                '#',
                '?',
                '&',
                '=',
                '%'
            };
            List<char> invalidChars = new List<char>();
            invalidChars.AddRange(InvalidFileNameChars);
            invalidChars.AddRange(URLSymbols);
            foreach (char invalidChar in invalidChars)
            {
                fileName = fileName.Replace(invalidChar, '_');
            }
        
            return fileName;
        }

        public string GetUrImage(string NameFolder,string Name,string Bytes)
        {
          if (!Directory.Exists($"wwwroot/{NameFolder}"))
           Directory.CreateDirectory($"wwwroot/{NameFolder}");
            string NameFile = CleanFileName(Name);
            string URL = $"{NameFolder}/{ NameFile}.png";
            string path = $"wwwroot/{URL}";

          if (!File.Exists(path))
            {
                using (FileStream fileStream = new FileStream(path, FileMode.Create))
                {
                    using (BinaryWriter writer = new BinaryWriter(fileStream))
                    {
                        foreach (var x in Bytes.Split(' '))
                        {
                            writer.Write(byte.Parse(x));
                        }
                    }
                }
                return URL;
            }
          else
            return URL;
        }
   }
}
