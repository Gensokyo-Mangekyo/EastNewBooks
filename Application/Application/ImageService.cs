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
        public string GetUrImage(string NameFolder,string Name,string Bytes)
        {
          if (!Directory.Exists($"wwwroot/{NameFolder}"))
           Directory.CreateDirectory($"wwwroot/{NameFolder}");

            string path = $"wwwroot/{NameFolder}/{Name}.png";

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
                return path;
            }
          else
            return $"wwwroot /{ NameFolder}/{ Name}.png";
        }
   }
}
