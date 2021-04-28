using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {

            ServiceReference1.Service1Client invokeClient = new ServiceReference1.Service1Client();
            string nothing=invokeClient.GetData(1);
            Console.WriteLine(nothing);
            Console.ReadLine();
        }
    }
}
