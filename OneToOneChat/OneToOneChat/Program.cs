using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;

namespace ITandDDP_Lab1
{
    class Program
    {
        private const string host = "127.0.0.1";
        private static int listeningPort;
        private static int connectionPort;
        private static Socket? socket;
        private static string userName = "";
        private static int nextSentMessageIndex = 0;
        private static int nextRecievedMessageIndex = 0;
        private static Dictionary<int, string> recievedQueuedMessages = new Dictionary<int, string>();

        static void Main(string[] args)
        {
            Console.WriteLine("What's your nickname?");
            while (userName == null || userName.Trim() == string.Empty)
            {
                userName = Console.ReadLine();
            }
            GetPorts();
            Connect();
            CreateDialog();
            Console.ReadLine();
        }

        private static void GetPorts()
        {
            while (true)
            {
                Console.WriteLine("What port should we listen to?");
                if (!int.TryParse(Console.ReadLine(), out int port) && (port < 1000 || port >= 10000))
                {
                    Console.WriteLine("Invalid port!");
                    continue;
                }

                listeningPort = port;
                break;
            }
            while (true)
            {
                Console.WriteLine("What port should we post to?");
                if (!int.TryParse(Console.ReadLine(), out int port) && (port < 1000 || port >= 10000))
                {
                    Console.WriteLine("Invalid port!");
                    continue;
                }

                connectionPort = port;
                break;
            }
        }

        private static void Connect()
        {
            Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
            socket.Bind(new IPEndPoint(IPAddress.Parse(host), listeningPort));
            IPEndPoint connectionEndPoint = new IPEndPoint(IPAddress.Parse(host), connectionPort);

            while (true)
            {
                try
                {
                    socket.Connect(connectionEndPoint);
                    socket.Shutdown(SocketShutdown.Both);
                    socket.Close();
                    break;
                }
                catch (SocketException)
                {
                    Thread.Sleep(1000);
                    Console.WriteLine("Connection failed. Trying to reconnect...");
                }
            }

            Console.WriteLine($"Succesfully connected to {connectionEndPoint.Address}:{connectionEndPoint.Port}!\nYou can start chatting now!");
        }

        private static void SendUserName()
        {
            byte[] currentUserName = Encoding.Unicode.GetBytes(userName);
            socket.SendTo(currentUserName, new IPEndPoint(IPAddress.Parse(host), connectionPort));
        }
        private static string GetMessageWithAuthor(string message) => $"{userName}: {message}";

        private static void CreateDialog()
        {
            try
            {
                socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
                new Task(ListenToPort).Start();


                while (true)
                {
                    string msg = GetMessageWithAuthor(Console.ReadLine());
                    byte[] data = Encoding.Unicode.GetBytes($"(%{nextSentMessageIndex++}%) {msg}");
                    socket.SendTo(data, new IPEndPoint(IPAddress.Parse(host), connectionPort));

                    // To check for right order uncomment this lines

                    //data = Encoding.Unicode.GetBytes($"(%{1 + nextSentMessageIndex++}%) {msg}");
                    //socket.SendTo(data, new IPEndPoint(IPAddress.Parse(host), connectionPort));
                    //data = Encoding.Unicode.GetBytes($"(%{1 + nextSentMessageIndex++}%) {msg}");
                    //socket.SendTo(data, new IPEndPoint(IPAddress.Parse(host), connectionPort));
                    //data = Encoding.Unicode.GetBytes($"(%{nextSentMessageIndex++ - 2}%) {msg}");
                    //socket.SendTo(data, new IPEndPoint(IPAddress.Parse(host), connectionPort));
                }
            }
            catch (Exception)
            {
                Console.WriteLine("The connection was interrupted.");
            }
            finally
            {
                CloseUdp();
            }
        }

        private static void ListenToPort()
        {
            string indexPattern = @"^\(%(\d+)%\) ";

            try
            {
                socket.Bind(new IPEndPoint(IPAddress.Parse(host), listeningPort));

                while (true)
                {
                    EndPoint endPoint = new IPEndPoint(IPAddress.Parse(host), connectionPort);

                    do
                    {
                        var data = new byte[64];
                        var count = socket.ReceiveFrom(data, ref endPoint);

                        string sb = (Encoding.Unicode.GetString(data, 0, count));

                        var matchCollection = Regex.Matches(sb, indexPattern);

                        if (matchCollection.Count == 0)
                        {
                            continue;
                        }

                        var message = Regex.Replace(sb.ToString(), indexPattern, "");

                        // To check for right order uncomment this line
                        //message = sb;

                        if (matchCollection.Count == 1)
                        {
                            int recievedIndex = int.Parse(matchCollection[0].Groups[1].Value);

                            if (recievedIndex == nextRecievedMessageIndex)
                            {
                                Console.WriteLine(message);
                                nextRecievedMessageIndex++;
                                while (recievedQueuedMessages.Count > 0)
                                {
                                    var curMsg = recievedQueuedMessages[nextRecievedMessageIndex];
                                    if (curMsg != null)
                                    {
                                        Console.WriteLine(curMsg);
                                        recievedQueuedMessages.Remove(nextRecievedMessageIndex);
                                        nextRecievedMessageIndex++;
                                    }
                                    else
                                    {
                                        Console.WriteLine("Some data was lost! Waiting for the message...");
                                        break;
                                    }
                                }
                            }
                            else
                            {
                                recievedQueuedMessages.Add(recievedIndex, message);
                            }
                        }

                    } while (socket.Available > 0);
                }
            }
            catch (Exception)
            {
                Console.WriteLine("The connection was interrupted");
            }
            finally
            {
                CloseUdp();
            }
        }

        private static void CloseUdp()
        {
            if (socket != null)
            {
                socket.Shutdown(SocketShutdown.Both);
                socket.Close();
            }
        }
    }
}